"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Store } from "lucide-react";
import cover from "../../../../images/samurai_market.png";
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
              “He will win who, prepared himself, waits to take the enemy unprepared.” ― Sun Tzu, The Art of War
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
          <h3 className="text-3xl font-bold mb-2">
            <div className="flex">
              <Store className="mr-2" />
              Marketplace
            </div>
          </h3>
          <h3>Trade (buy & sell) NFT game assets on APTOS</h3>
          <br />
          <h3>COMIN SOON ...</h3>
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
