import React from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { attackCastle } from '@/entry-functions/attackCastle';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const AttackCastle = () => {
  const { account, signAndSubmitTransaction } = useWallet();

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
        description: `Failed to launch attack: ${error.message}`,
      });
    }
  };

  return (
    <Button onClick={handleAttack} disabled={!account} className="bg-red-600 hover:bg-red-700">
      Attack
    </Button>
  );
};