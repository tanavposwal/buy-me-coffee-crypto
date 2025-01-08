"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

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
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const payForCoffee = async () => {
    if (!web3 || !coffeeContract) return;
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    coffeeContract.methods
      .payForCoffee(email)
      .send({ from: accounts[0], value: web3.utils.toWei(coffeeFee, "ether") })
      .on("transactionHash", (hash: any) => {
        setHash(hash);
      })
      .on("receipt", () => {
        toast.success("Transaction Successful.");
        setComplete(true);
        setLoading(false);
      })
      .on("error", (err: any) => {
        toast.error("Something went wrong.");
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <main>
      {complete && <PayComplete hash={hash} />}

      <div className="flex flex-col gap-5 rounded-xl p-6 shadow bg-white w-80">
        <h3 className="text-lg font-bold">Support Tanav</h3>
        <label htmlFor="email" className="text-sm opacity-60 -mb-3">
          Enter email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          className="bg-gray-100 px-3 py-2 rounded-lg w-full focus-within:bg-white border-2 focus-within:border-amber-300 outline-none transition-all ease-in-out"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />

        <button
          className="bg-gradient-to-tr from-yellow-300 to-amber-300 py-4 font-bold rounded-xl shadow-sm focus-within:scale-95 transition-transform ease-in-out italic"
          onClick={() => payForCoffee()}>
          {loading ? "loading..." : `Support ${coffeeFee} ETH`}
        </button>
      </div>
    </main>
  );
}

function PayComplete({ hash }: { hash: string }) {
  return (
    <div className="bg-black/70 flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md select-none">
      <div className="rounded-xl p-6 shadow bg-white w-80">
        <Image src={"/done.gif"} alt="done" width={300} height={300} />
        <h1 className="text-2xl font-bold">Thank You!</h1>
        <p className="text-lg opacity-60">Your support is appreciated. 😀</p>
        <div className="flex gap-2 items-center mt-1">
          <p className="text-xs truncate opacity-60">{hash}</p>
          <button
            className="text-sm border rounded-sm bg-neutral-100 px-1 py-0"
            onClick={() => {
              navigator.clipboard.writeText(hash);
              toast.info("Copied!");
            }}>
            copy
          </button>
        </div>
      </div>
    </div>
  );
}
