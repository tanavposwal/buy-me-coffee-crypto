"use client";

import { contractABI } from "@/abi";
import { useEffect, useState } from "react";
import Web3 from "web3";
import PayForm from "./PayForm";

export default function Pay() {
  const [web3, setWeb3] = useState<any>(null);
  const [coffeeContract, setCoffeeContract] = useState<any>(null);
  const [coffeeFee, setCoffeeFee] = useState<string>("");
  const contractAddress = "0x6f83a95F8D7F1d04AAff0207fa95308a5B6CdF51";
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const coffeeInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setCoffeeContract(coffeeInstance);
         
          coffeeInstance.methods
            .coffeePrice()
            .call()
            .then((fee: any) => {
              setCoffeeFee(web3Instance.utils.fromWei(fee, "ether"));
              setLoading(false)
            });
        })
        .catch((err) => {
          // Handle error if the user rejects the connection request
          console.error(err);
        });
    } else {
      alert("Please install an another Ethereum wallet.");
    }
  }, []);

  return (
    <div>
      {(web3 && !loading) ? (
        <PayForm
          web3={web3}
          coffeeContract={coffeeContract}
          coffeeFee={coffeeFee}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
