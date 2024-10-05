import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shogun Game",
  description: "Shogun is a fully on-chain game on Aptos L1 written in Move",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <ReactQueryProvider>
            <div id="root">{children}</div>
            <WrongNetworkAlert />
            <Toaster />
          </ReactQueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
