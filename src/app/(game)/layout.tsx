"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Sword, Shield, Trophy, HelpCircle, Wallet, LayoutDashboard, Github, Book, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import logo from "../../../images/shogun_logo.png";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "../../components/WalletSelector";
import { usePathname } from "next/navigation";

export default function GameLayout({ children }: { children: ReactNode }) {
  const { connected } = useWallet();
  const year = new Date().getFullYear();
  const [route, setRoute] = useState("");
  const pathname = usePathname();
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white font-sans">
        <aside className="w-64 bg-gray-800 p-4 relative">
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
                  href="/dashboard"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/dashboard" ? "text-yellow-300" : ""}`}
                >
                  <LayoutDashboard className="mr-2" />
                  Dashboard
                </Link>
              </li>
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
              <hr className="text-gray-500" />
              <li>
                <Link
                  href="/help"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/help" ? "text-yellow-300" : ""}`}
                >
                  <HelpCircle className="mr-2" />
                  Help
                </Link>
              </li>
              <li>
                <Link
                  href="/wallet"
                  className={`flex items-center p-2 rounded hover:bg-gray-700 ${route === "/wallet" ? "text-yellow-300" : ""}`}
                >
                  <Wallet className="mr-2" />
                  Wallet
                </Link>
              </li>
            </ul>
          </nav>
          <Link className="social-link absolute" href="https://github.com/enderNakamoto/warlords" target="_blank">
            <Github className="text-gray-400 hover:text-white" />
          </Link>
        </aside>

        <main className="flex-1 p-8">
          <header className="flex justify-end items-center space-x-8">
            <span className="text-sm text-gray-500" title="Network">
              APTOS
            </span>
            <Button onClick={() => setIsStoryOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 rounded-md">
              <Book className="mr-2" />
              Story
            </Button>
            <div className="flex gap-2 items-center flex-wrap bg-yellow-500 text-gray-900 hover:bg-yellow-600 rounded-md">
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

        {isStoryOpen && (
          <aside className="fixed inset-y-0 right-0 w-96 bg-gray-800 p-6 overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Game Story</h2>
              <Button onClick={() => setIsStoryOpen(false)} variant="ghost" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <p>
                  In the tumultuous era of feudal Japan, you rise as a powerful samurai, seeking to unify the land under
                  your rule. As chaos engulfs the nation, rival clans vie for supremacy, each hoping to conquer the
                  Castle, claim the title of Shogun and bring order to the realm.
                </p>
                <p>
                  Your journey begins with joining the game as a General and mobilizing the army under your command.
                  With each turn, you'll face critical decisions that will shape the fate of your army and the future of
                  Japan.
                </p>
                <p>
                  But beware, for as your influence spreads, so too does the threat of betrayal. Keep a watchful eye on
                  your allies and enemies alike, for in the world of Shogun, today's friend may become tomorrow's foe.
                </p>
                <p>
                  Weather the storms of war, navigate difficult conditions, and prove your worth on the battlefield. Can
                  you outmaneuver your rivals, and rise to become the ultimate ruler of Japan? The path to becoming
                  Shogun is fraught with peril, but for those with the courage and wisdom to seize it, eternal glory
                  awaits.
                </p>
                <p>Your legend begins now. The fate of Japan is in your hands, General!</p>
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </>
  );
}
