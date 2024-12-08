"use client";

import { contractABI } from "@/abi";
import { Skeleton } from "@/components/ui/skeleton";
import { use, useEffect, useState } from "react";
import Web3 from "web3";

export default function Me() {
  const [web3, setWeb3] = useState<any>(null);
  const [coffeeContract, setCoffeeContract] = useState<any>(null);
  const contractAddress = "0x6f83a95F8D7F1d04AAff0207fa95308a5B6CdF51";
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        })
        .catch((err) => {
          // Handle error if the user rejects the connection request
          console.error(err);
        });
    } else {
      alert("Please install an another Ethereum wallet.");
    }
  }, []);

  useEffect(() => {
    if (web3 && coffeeContract) {
      coffeeContract.methods
        .getAllPayments()
        .call()
        .then((values: any) => {
          setPayments(values);
          setLoading(false);
        });
    }
  }, [web3, coffeeContract]);

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center gap-3">
      <h1 className="text-3xl font-black">Admin</h1>
      {loading ? (
        <div>
          <Skeleton className="h-96 w-[300px]" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-60">
            Total {payments.length} people have sent you the coffee!
          </p>
          <ul className="h-96 border rounded shadow p-6 flex flex-col gap-1 overflow-y-auto">
            {payments.map((payment: any) => (
              <li
                key={payment.email}
                className="opacity-80 text-sm list-disc ml-3"
              >
                <p>email: {payment.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
