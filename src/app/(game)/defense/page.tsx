"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { defend } from "@/entry-functions/defend";
import { getCastleDetails } from "@/view-functions/getCastleDetails";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { handleAptosError } from "@/utils/aptosErrorHandler";
import cover from "../../../../images/samurai_def.png";
import shogun from "../../../../images/shogun.png";

interface DefenseArmy {
  archers: string;
  cavalry: string;
  infantry: string;
}

interface CastleDetails {
  kingAddress: string;
  defenseArmy: DefenseArmy;
}

export default function Defense() {
  const [castleDetails, setCastleDetails] = useState<CastleDetails | null>(null);
  const [loadingCastleDetails, setLoadingCastleDetails] = useState(true);
  const [castleError, setCastleError] = useState<string | null>(null);
  const [archerCount, setArcherCount] = useState(0);
  const [infantryCount, setInfantryCount] = useState(0);
  const [cavalryCount, setCavalryCount] = useState(0);
  const MAX_TROOPS = 1600;
  const { account, signAndSubmitTransaction } = useWallet();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchCastleDetails = async () => {
      try {
        const details = await getCastleDetails();
        console.log("details", details);
        setCastleDetails(details);
      } catch (err) {
        console.error("Failed to fetch castle details:", err);
        const aptosError = handleAptosError(err);
        setCastleError("Failed to fetch castle details. " + aptosError);
      } finally {
        setLoadingCastleDetails(false);
      }
    };

    fetchCastleDetails();
  }, [reload]);

  const handleDefend = async () => {
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
      const payload = defend({ archers: archerCount, infantry: infantryCount, cavalry: cavalryCount });
      const { hash } = await signAndSubmitTransaction(payload);

      toast({
        title: "Success",
        description: `Defense army changed! Transaction hash: ${hash}`,
      });
      setReload(!reload);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to change defense army: ${error.message}`,
      });
    }
  };

  if (loadingCastleDetails) return <div>Loading castle details...</div>;
  if (castleError) return <div>{castleError}</div>;

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
              “If you wait by the river long enough, the bodies of your enemies will float by.” ― Sun Tzu, The Art of
              War
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
          <h3 className="text-2xl font-bold mb-2">Castle Defense »</h3>
          <div className="flex justify-around mt-4">
            <div className="flex flex-col items-center">
              <Shield className="text-yellow-500 mb-2" />
              <p className="tracking-wide">Archers</p>
              <p className="text-3xl font-bold mt-4">{castleDetails?.defenseArmy?.archers}</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-green-500 mb-2" />
              <p className="tracking-wide">Infantry</p>
              <p className="text-3xl font-bold mt-4">{castleDetails?.defenseArmy?.infantry}</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-red-500 mb-2" />
              <p className="tracking-wide">Cavalry</p>
              <p className="text-3xl font-bold mt-4">{castleDetails?.defenseArmy?.cavalry}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {account && castleDetails && castleDetails.kingAddress === account.address && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white text-center">CHANGE DEFENSE, KING</h3>
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
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-center w-full mb-3"
                onClick={handleDefend}
                disabled={!account}
              >
                CHANGE
              </Button>
              <i>Cost: 3 turns</i>
            </div>
          </CardContent>
        </Card>
      )}

      <hr />
    </>
  );
}
