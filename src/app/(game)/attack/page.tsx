"use client";

import { useState } from "react";
// import { joinGame } from "@/entry-functions/joinGame";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Swords, Footprints, Medal } from "lucide-react";
import Image from "next/image";
import cover from "../../../../images/cover.png";

export default function Attack() {
  const [generalName, setGeneralName] = useState("");
  const [archerCount, setArcherCount] = useState(0);
  const [infantryCount, setInfantryCount] = useState(0);
  const [cavalryCount, setCavalryCount] = useState(0);
  const MAX_TROOPS = 2000;

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
        />
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">Player Status »</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-base text-gray-400">Remaining Turns</p>
              <div className="flex items-center">
                <Footprints className="h-6 w-6 mr-2 text-blue-500" />
                <span className="text-2xl font-bold text-blue-500">10</span>
              </div>
            </div>
            <div>
              <p className="text-base text-gray-400">Ranking Points</p>
              <div className="flex items-center">
                <Medal className="h-6 w-6 mr-2 text-orange-500" />
                <span className="text-2xl font-bold text-orange-500">1250</span>
              </div>
            </div>
            <div>
              <p className="text-base text-gray-400">Last turn Update</p>
              <p className="text-xl font-bold text-pink-400">~ 2 hours ago</p>
            </div>
            <div>
              <p className="text-base text-gray-400">Current Leader Points</p>
              <p className="text-xl font-bold text-green-600">1500</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">Mobilized Army »</h3>
          <div className="flex justify-around mt-4">
            <div className="flex flex-col items-center">
              <Swords className="text-yellow-500 mb-2" />
              <p className="tracking-wide">Archers</p>
              <p className="text-3xl font-bold mt-4">500</p>
            </div>
            <div className="flex flex-col items-center">
              <Swords className="text-green-500 mb-2" />
              <p className="tracking-wide">Infantry</p>
              <p className="text-3xl font-bold mt-4">1000</p>
            </div>
            <div className="flex flex-col items-center">
              <Swords className="text-red-500 mb-2" />
              <p className="tracking-wide">Cavalry</p>
              <p className="text-3xl font-bold mt-4">500</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-white text-center">JOIN THE GAME</h3>
          <form>
            <Input
              type="text"
              placeholder="Enter your general's name"
              className="w-[320px] text-gray-300 rounded-md mx-auto my-0"
              value={generalName}
              onChange={(e) => setGeneralName(e.target.value)}
              maxLength={100}
            />

            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-3">
              {/* onClick={handleJoinGame} disabled={!account || !generalName} */}
              JOIN
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-white text-center">MOBILIZE YOUR ARMY</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex justify-between">
                <div className="flex items-center">
                  <Swords className="text-yellow-500 mr-4" />{" "}
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
                  <Swords className="text-green-500 mr-4" />{" "}
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
                  <Swords className="text-red-500 mr-4" />{" "}
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
              MOBILIZE
            </Button>
            <i>Cost: 3 turns</i>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-4 text-white text-center">Ready to conquer the Castle?</h3>

      <div className="text-center">
        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl font-bold rounded-full transform transition-transform hover:scale-105">
          {/* onClick={handleJoinGame} disabled={!account || !generalName} */}
          <Swords className="mr-2" /> ATTACK <Swords className="ml-2" />
        </Button>
      </div>

      <hr />
    </>
  );
}
