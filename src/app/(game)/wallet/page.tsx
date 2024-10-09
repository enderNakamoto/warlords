"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AccountInfo } from "@/components/AccountInfo";
import { NetworkInfo } from "@/components/NetworkInfo";
import { WalletDetails } from "@/components/WalletDetails";
import cover from "../../../../images/samurai_coin.png";
import shogun from "../../../../images/shogun.png";

export default function Wallet() {
  return (
    <>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Image
            src={shogun}
            width={125}
            height={50}
            quality={100}
            placeholder="blur"
            alt="Shogun Text"
            className="rounded-lg mr-2"
          />
          <h1 className="text-3xl font-bold"> : Rise of Empires</h1>
        </div>
        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center justify-center text-wrap w-[300px] mx-auto pointer-events-none z-10">
            <h3 className="text-white text-xl font-bold">
              “Know yourself and you will win all battles” ― Sun Tzu, The Art of War
            </h3>
          </div>
          <Image
            src={cover}
            width={400}
            height={200}
            quality={100}
            placeholder="blur"
            alt="Shogun Banner"
            className="mx-auto rounded-lg hover:opacity-20 cursor-pointer relative z-20"
          />
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <WalletDetails />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <NetworkInfo />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <AccountInfo />
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
