"use client";

import { useEffect, useState } from "react";
import { joinGame } from "@/entry-functions/joinGame";
import { mobilizeArmy } from "@/entry-functions/mobilizeArmy";
import { getPlayerState } from "@/view-functions/getPlayerDetails";
import { attackCastle } from "@/entry-functions/attackCastle";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Swords } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { handleAptosError } from "@/utils/aptosErrorHandler";
import Image from "next/image";
import cover from "../../../../images/samurai_atk.png";
import shogun from "../../../../images/shogun.png";

interface Army {
  archers: string;
  cavalry: string;
  infantry: string;
}

interface PlayerState {
  army: Army;
}

export default function Attack() {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [loadingPlayerState, setLoadingPlayerState] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [generalName, setGeneralName] = useState("");
  const [archerCount, setArcherCount] = useState(0);
  const [infantryCount, setInfantryCount] = useState(0);
  const [cavalryCount, setCavalryCount] = useState(0);
  const MAX_TROOPS = 2000;
  const { account, signAndSubmitTransaction } = useWallet();

  useEffect(() => {
    const fetchPlayerState = async () => {
      if (!account) return;

      setLoadingPlayerState(true);

      try {
        const state = await getPlayerState(account.address);
        setPlayerState(state);
      } catch (error) {
        console.error("Failed to fetch player state:", error);
        const aptosError = handleAptosError(error);
        setPlayerError("Failed to fetch player state. " + aptosError);
      } finally {
        setLoadingPlayerState(false);
      }
    };

    fetchPlayerState();
  }, [account]);

  const handleJoinGame = async (e: any) => {
    e.preventDefault();
    if (!account) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your wallet first.",
      });
      return;
    }
    if (!generalName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a name for your general.",
      });
      return;
    }
    try {
      const payload = joinGame({ generalName });
      const { hash } = await signAndSubmitTransaction(payload);
      toast({
        title: "Success",
        description: `Joined the game! Transaction hash: ${hash}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to join the game: ${error.message}`,
      });
    }
  };

  const handleMobilizeArmy = async () => {
    if (!account) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your wallet first.",
      });
      return;
    }

    if (archerCount < 0 || infantryCount < 0 || cavalryCount < 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Army composition cannot contain negative values.",
      });
      return;
    }

    if (archerCount + infantryCount + cavalryCount > MAX_TROOPS) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Army composition cannot exceed " + MAX_TROOPS,
      });
      return;
    }

    try {
      const payload = mobilizeArmy({ archers: archerCount, infantry: infantryCount, cavalry: cavalryCount });
      const { hash } = await signAndSubmitTransaction(payload);

      toast({
        title: "Success",
        description: `Army mobilized! Transaction hash: ${hash}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to mobilize army: ${error.message}`,
      });
    }
  };

  const handleAttack = async () => {
    if (!account) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your wallet first.",
      });
      return;
    }

    try {
      const payload = attackCastle();
      const { hash } = await signAndSubmitTransaction(payload);

      toast({
        title: "Attack Launched",
        description: `Attack initiated! Transaction hash: ${hash}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Attack Failed",
        description: `Failed to launch attack: ${error}`,
      });
    }
  };

  if (loadingPlayerState) return <div>Loading player state...</div>;

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
              “Treat your men as you would your own beloved sons. And they will follow you into the deepest valley.” ―
              Sun Tzu, The Art of War
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

      {playerError && <div>{playerError}</div>}

      {!playerState ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white text-center">JOIN THE GAME, GENERAL</h3>
            <form>
              <Input
                type="text"
                placeholder="Enter your general's name"
                className="w-[320px] text-gray-300 rounded-md mx-auto my-0"
                value={generalName}
                onChange={(e) => setGeneralName(e.target.value)}
                maxLength={100}
              />

              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-3"
                onClick={handleJoinGame}
                disabled={!account || !generalName}
              >
                JOIN
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Mobilized Army »</h3>
              <div className="flex justify-around mt-4">
                <div className="flex flex-col items-center">
                  <Swords className="text-yellow-500 mb-2" />
                  <p className="tracking-wide">Archers</p>
                  <p className="text-3xl font-bold mt-4">{playerState?.army?.archers}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Swords className="text-green-500 mb-2" />
                  <p className="tracking-wide">Infantry</p>
                  <p className="text-3xl font-bold mt-4">{playerState?.army?.infantry}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Swords className="text-red-500 mb-2" />
                  <p className="tracking-wide">Cavalry</p>
                  <p className="text-3xl font-bold mt-4">{playerState?.army?.cavalry}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-white text-center">REMOBILIZE YOUR ARMY, GENERAL</h3>
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
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-center w-full mb-3"
                  onClick={handleMobilizeArmy}
                  disabled={!account}
                >
                  MOBILIZE
                </Button>
                <i>Cost: 3 turns</i>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold mb-4 text-white text-center">Ready to conquer the Castle?</h3>

          <div className="text-center">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl font-bold rounded-full transform transition-transform hover:scale-105"
              onClick={handleAttack}
              disabled={!account}
            >
              <Swords className="mr-2" /> ATTACK <Swords className="ml-2" />
            </Button>
            <br />
            <i>Cost: 10 turns</i>
          </div>
        </>
      )}
      <hr />
    </>
  );
}
