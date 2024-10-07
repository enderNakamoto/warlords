import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sun, Crown } from "lucide-react";
import Image from "next/image";
import cover from "../../../../images/samurai_def.png";

export default function Defense() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Shogun: Rise of Empires</h1>
        <Image
          src={cover}
          width={400}
          height={200}
          quality={100}
          placeholder="blur"
          alt="Shogun Banner"
          className="mx-auto rounded-lg"
        />{" "}
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">Castle Status »</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-base text-gray-400">Weather</p>
              <div className="flex items-center">
                <Sun className="h-6 w-6 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-lime-300">Sunny</span>
              </div>
            </div>
            <div>
              <p className="text-base text-gray-400">Current King</p>
              <div className="flex items-center">
                <Crown className="h-6 w-6 text-red-500 mr-2" />
                <span className="text-2xl font-bold text-red-500">Tokugawa</span>
              </div>
            </div>
            <div>
              <p className="text-base text-gray-400">Last Weather Update</p>
              <p className="text-xl font-bold text-green-400">~ 2 hours ago</p>
            </div>
            <div>
              <p className="text-base text-gray-400">Last King Update</p>
              <p className="text-xl font-bold text-indigo-400">~ 2 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">Castle Defense »</h3>
          <div className="flex justify-around mt-4">
            <div className="flex flex-col items-center">
              <Shield className="text-yellow-500 mb-2" />
              <p className="tracking-wide">Archers</p>
              <p className="text-3xl font-bold mt-4">500</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-green-500 mb-2" />
              <p className="tracking-wide">Infantry</p>
              <p className="text-3xl font-bold mt-4">500</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-red-500 mb-2" />
              <p className="tracking-wide">Cavalry</p>
              <p className="text-3xl font-bold mt-4">500</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
