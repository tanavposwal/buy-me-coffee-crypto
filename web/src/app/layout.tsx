import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Buy Me Coffee Crypto",
  description: "Buy Tanav Poswal a coffee via crypto | Buy Me Coffee Crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased min-h-screen w-full bg-yellow-300`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
