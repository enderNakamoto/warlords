import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { joinGame } from "@/entry-functions/joinGame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const JoinGame = () => {
  const [generalName, setGeneralName] = useState("");
  const { account, signAndSubmitTransaction } = useWallet();

  const handleJoinGame = async () => {
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">Join the Game</h2>
      <Input
        placeholder="Enter your general's name"
        value={generalName}
        onChange={(e) => setGeneralName(e.target.value)}
      />
      <Button onClick={handleJoinGame} disabled={!account || !generalName} className="bg-slate-600">
        Join Game
      </Button>
    </div>
  );
};
