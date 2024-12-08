import Pay from "@/components/Pay";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center gap-3">
      <h1 className="text-3xl font-black">Buys Me A Coffee</h1>
      <div className="flex gap-3">
      <h2 className="text-md font-bold">Tanav Poswal</h2>
      <a href="https://tanavindev.tech/" className="text-md hover:underline">portfolio</a>
      </div>
      <Pay />
    </main>
  );
}
