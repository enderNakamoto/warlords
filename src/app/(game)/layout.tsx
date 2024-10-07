"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Sword, Shield, Trophy, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../../../images/shogun_logo.png";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "../../components/WalletSelector";
import { usePathname } from "next/navigation";

export default function GameLayout({ children }: { children: ReactNode }) {
  const { connected } = useWallet();
  const year = new Date().getFullYear();
  const [route, setRoute] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white font-sans">
        <aside className="w-64 bg-gray-800 p-4">
          <Link href="/">
            <div className="flex items-center mb-8">
              <Image src={logo} width={40} height={40} alt="Shogun logo" className="mr-2" />
              <h1 className="text-2xl font-bold">Shogun</h1>
            </div>
          </Link>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/attack"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/attack" ? "text-yellow-300" : ""}`}
                >
                  <Sword className="mr-2" />
                  Attack
                </Link>
              </li>
              <li>
                <Link
                  href="/defense"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/defense" ? "text-yellow-300" : ""}`}
                >
                  <Shield className="mr-2" />
                  Defense
                </Link>
              </li>
              <li>
                <Link
                  href="/rankings"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/rankings" ? "text-yellow-300" : ""}`}
                >
                  <Trophy className="mr-2" />
                  Rankings
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/help" ? "text-yellow-300" : ""}`}
                >
                  <HelpCircle className="mr-2" />
                  Help
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <header className="flex justify-end items-center space-x-8">
            <span className="text-sm text-gray-500" title="Network">
              APTOS
            </span>
            <div className="flex gap-2 items-center flex-wrap bg-yellow-500 text-gray-900 hover:bg-yellow-600">
              <WalletSelector />
            </div>
          </header>

          {connected ? (
            <div className="space-y-8">{children}</div>
          ) : (
            <CardHeader>
              <CardTitle>To get started, connect a wallet</CardTitle>
            </CardHeader>
          )}

          <footer className="flex items-center justify-center px-4 py-2 mt-8 max-w-screen-xl mx-auto w-full flex-wrap">
            <p>
              <i>© Shogun {year}. All rights reserved.</i>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
