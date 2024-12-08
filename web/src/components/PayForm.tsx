"use client";

import { useState } from "react";

export default function PayForm({
  web3,
  coffeeContract,
  coffeeFee,
}: {
  web3: any;
  coffeeContract: any;
  coffeeFee: string;
}) {
  const [email, setEmail] = useState("");

  const payForCoffee = async () => {
    console.log("in payment")
    if (!web3 || !coffeeContract) return;

    console.log("we have web3")
    const accounts = await web3.eth.getAccounts();
    console.log("we have accounts")
    coffeeContract.methods
      .payForCoffee(email)
      .send({ from: accounts[0], value: web3.utils.toWei(coffeeFee, "ether") })
      .on("transactionHash", (hash: any) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt: any) => {
        console.log("Transaction successful:", receipt);
      })
      .on("error", (error: any) => {
        console.error("Error:", error);
      });
  };

  return (
    <main>
      <div className="flex flex-col gap-3 border rounded p-4 shadow">
        <h3 className="text-lg font-bold">Buy a coffee of: {coffeeFee} eth</h3>
        <label htmlFor="email" className="text-sm opacity-60">
          Enter email
        </label>
        <input
          id="email"
          type="email"
          className="border rounded  px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          onClick={() => payForCoffee()}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 rounded-lg"
        >
          Send a coffee via eth
        </button>
      </div>
    </main>
  );
}
