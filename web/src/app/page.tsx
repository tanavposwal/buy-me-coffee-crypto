import Pay from "@/components/Pay";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center gap-6">
      <div className="rounded-xl p-6 shadow bg-white flex items-center justify-center w-80">
        <h1 className="text-2xl font-bold">Buy Tanav A Coffee</h1>
      </div>
      <Pay />
      <div className="rounded-xl p-6 shadow bg-white flex gap-2 w-80">
        <h2 className="text-lg font-bold">About: </h2>
        <a
          href="https://tanavindev.tech/"
          className="text-lg font-semibold opacity-60 hover:opacity-100 transition-opacity">
          portfolio
        </a>
      </div>
    </main>
  );
}
