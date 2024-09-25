import React, { useEffect, useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getPlayerState } from '@/view-functions/getPlayerDetails';
import { toast } from "@/components/ui/use-toast";

interface Army {
  archers: string;
  cavalry: string;
  infantry: string;
}

interface PlayerState {
  generalName: string;
  army: Army;
  turns: number;
}

export const PlayerStateDisplay = () => {
  const { account } = useWallet();
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayerState = async () => {
      if (!account) return;

      setLoading(true);
      try {
        const state = await getPlayerState(account.address);
        setPlayerState(state);
      } catch (error) {
        console.error("Failed to fetch player state:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch player state. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerState();
  }, [account]);

  if (!account) {
    return <div>Please connect your wallet to view your player state.</div>;
  }

  if (loading) {
    return <div>Loading player state...</div>;
  }

  if (!playerState) {
    return <div>No player state found. Have you joined the game?</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Player State</h2>
      <p><strong>General Name:</strong> {playerState.generalName}</p>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">Army:</h3>
        <ul className="list-disc list-inside">
          <li>Archers: {playerState.army.archers}</li>
          <li>Cavalry: {playerState.army.cavalry}</li>
          <li>Infantry: {playerState.army.infantry}</li>
        </ul>
      </div>
      <p className="mt-2"><strong>Turns Remaining:</strong> {playerState.turns}</p>
    </div>
  );
};