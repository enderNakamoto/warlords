"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sun, Crown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import cover from "../../../../images/samurai_def.png";

export default function Defense() {
  const [archerCount, setArcherCount] = useState(0);
  const [infantryCount, setInfantryCount] = useState(0);
  const [cavalryCount, setCavalryCount] = useState(0);
  const MAX_TROOPS = 1600;

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

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-white text-center">CHANGE DEFENSE</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex justify-between">
                <div className="flex items-center">
                  <Shield className="text-yellow-500 mr-4" />{" "}
                  <span className="text-sm font-medium text-gray-200">Archers</span>
                </div>
                <span className="text-xl font-bold text-white">{archerCount}</span>
              </label>
              <Slider
                min={0}
                max={MAX_TROOPS}
                step={1}
                value={[archerCount]}
                onValueChange={(value) => setArcherCount(value[0])}
                className="w-full text-white bg-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <label className="flex justify-between">
                <div className="flex items-center">
                  <Shield className="text-green-500 mr-4" />{" "}
                  <span className="text-sm font-medium text-gray-200">Infantry</span>
                </div>
                <span className="text-xl font-bold text-white">{infantryCount}</span>
              </label>
              <Slider
                min={0}
                max={MAX_TROOPS}
                step={1}
                value={[infantryCount]}
                onValueChange={(value) => setInfantryCount(value[0])}
                className="w-full text-white bg-green-500"
              />
            </div>
            <div className="space-y-2">
              <label className="flex justify-between">
                <div className="flex items-center">
                  <Shield className="text-red-500 mr-4" />{" "}
                  <span className="text-sm font-medium text-gray-200">Cavalry</span>
                </div>
                <span className="text-xl font-bold text-white">{cavalryCount}</span>
              </label>
              <Slider
                min={0}
                max={MAX_TROOPS}
                step={1}
                value={[cavalryCount]}
                onValueChange={(value) => setCavalryCount(value[0])}
                className="text-white bg-red-500 w-full"
              />
            </div>
            <p>
              Remaining troops:{" "}
              <span className="font-bold">{MAX_TROOPS - archerCount - infantryCount - cavalryCount}</span>
            </p>
            {MAX_TROOPS - archerCount - infantryCount - cavalryCount < 0 && (
              <p className="text-red-400">Troops limit exceeded!</p>
            )}
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-center w-full mb-3">
              {/* onClick={handleJoinGame} disabled={!account || !generalName} */}
              CHANGE
            </Button>
            <i>Cost: 3 turns</i>
          </div>
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
