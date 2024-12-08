"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      <div className="flex flex-col gap-3 border rounded p-6 shadow">
        <h3 className="text-lg font-bold">Buy a coffee of: {coffeeFee} eth</h3>
        <label htmlFor="email" className="text-sm opacity-60 -mb-2">
          Enter email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          onClick={() => payForCoffee()}
        >
          Send a coffee via eth
        </Button>
      </div>
    </main>
  );
}
