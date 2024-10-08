"use client";

import { useEffect, useState } from "react";
import { getCastleDetails } from "@/view-functions/getCastleDetails";
import { Card, CardContent } from "@/components/ui/card";
import {
  Footprints,
  Medal,
  Crown,
  Castle,
  User,
  Sun,
  Cloud,
  Snowflake,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
} from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getPlayerState } from "@/view-functions/getPlayerDetails";
import Image from "next/image";
import cover from "../../../../images/cover.png";
import shogun from "../../../../images/shogun.png";

interface CastleDetails {
  kingAddress: string;
  weatherValue: number;
}

interface PlayerState {
  generalName: string;
  turns: number;
  points: number;
}

export default function Dashboard() {
  const [castleDetails, setCastleDetails] = useState<CastleDetails | null>(null);
  const [loadingCastleDetails, setLoadingCastleDetails] = useState(true);
  const [castleError, setCastleError] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [loadingPlayerState, setLoadingPlayerState] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const { account } = useWallet();

  useEffect(() => {
    const fetchCastleDetails = async () => {
      try {
        const details = await getCastleDetails();
        console.log("details", details);
        setCastleDetails(details);
      } catch (err) {
        console.error(err);
        setCastleError("Failed to fetch castle details. Please try again.");
      } finally {
        setLoadingCastleDetails(false);
      }
    };

    fetchCastleDetails();
  }, []);

  useEffect(() => {
    const fetchPlayerState = async () => {
      if (!account) return;

      setLoadingPlayerState(true);

      try {
        const state = await getPlayerState(account.address);
        setPlayerState(state);
      } catch (error) {
        console.error("Failed to fetch player state:", error);
        setPlayerError("Failed to fetch player state. Please try again.");
      } finally {
        setLoadingPlayerState(false);
      }
    };

    fetchPlayerState();
  }, [account]);

  function weatherValueToString(weather: number) {
    switch (weather) {
      case 0:
        return "Clear";
      case 1:
        return "Clouds";
      case 2:
        return "Snow";
      case 3:
        return "Rain";
      case 4:
        return "Drizzle";
      case 5:
        return "Thunderstorm";
      default:
        return "Unknown";
    }
  }

  function weatherValueToIcon(weather: number) {
    switch (weather) {
      case 0:
        return <Sun className="h-6 w-6 text-yellow-500 mr-2" />;
      case 1:
        return <Cloud className="h-6 w-6 text-yellow-500 mr-2" />;
      case 2:
        return <Snowflake className="h-6 w-6 text-yellow-500 mr-2" />;
      case 3:
        return <CloudRain className="h-6 w-6 text-yellow-500 mr-2" />;
      case 4:
        return <CloudDrizzle className="h-6 w-6 text-yellow-500 mr-2" />;
      case 5:
        return <CloudLightning className="h-6 w-6 text-yellow-500 mr-2" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500 mr-2" />;
    }
  }

  function trimAddress(adr: string) {
    if (!adr || adr.length <= 10) return adr;
    return adr.substring(0, 10) + "...";
  }

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
          <h3 className="text-2xl font-bold mb-2">
            <div className="flex">
              <User className="mr-2" />
              Player Info »
            </div>
          </h3>
          {loadingPlayerState && <div>Loading player state...</div>}
          {playerError && <div>Error: {playerError}</div>}
          {playerState && (
            <>
              <div className="mb-4">
                <p className="text-base text-gray-400">General's Name</p>
                <p className="text-xl font-bold text-yellow-400">{playerState.generalName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-400">Remaining Turns</p>
                  <div className="flex items-center">
                    <Footprints className="h-6 w-6 mr-2 text-blue-500" />
                    <span className="text-2xl font-bold text-blue-500">{playerState.turns}</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-400">Ranking Points</p>
                  <div className="flex items-center">
                    <Medal className="h-6 w-6 mr-2 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-500">{playerState.points}</span>
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
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            <div className="flex">
              <Castle className="mr-2" />
              Castle Info »
            </div>
          </h3>
          {loadingCastleDetails && <div>Loading castle details...</div>}
          {castleError && <div>Error: {castleError}</div>}
          {castleDetails && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-base text-gray-400">Weather</p>
                <div className="flex items-center">
                  {weatherValueToIcon(castleDetails.weatherValue)}
                  <span className="text-2xl font-bold text-lime-300">
                    {weatherValueToString(castleDetails.weatherValue)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-base text-gray-400">Current King</p>
                <div className="flex items-center">
                  <Crown className="h-6 w-6 text-red-500 mr-2" />
                  <span className="text-2xl font-bold text-red-500">{trimAddress(castleDetails.kingAddress)}</span>
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
          )}
        </CardContent>
      </Card>

      <hr />
    </>
  );
}
