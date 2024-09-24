import React, { useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { mobilizeArmy } from '@/entry-functions/mobilizeArmy';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const MobilizeArmy = () => {
  const [archers, setArchers] = useState<number>(0);
  const [infantry, setInfantry] = useState<number>(0);
  const [cavalry, setCavalry] = useState<number>(0);
  const { account, signAndSubmitTransaction } = useWallet();

  const handleMobilizeArmy = async () => {
    if (!account) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your wallet first.",
      });
      return;
    }

    if (archers < 0 || infantry < 0 || cavalry < 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Army composition cannot contain negative values.",
      });
      return;
    }

    try {
      const payload = mobilizeArmy({ archers, infantry, cavalry });
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">Mobilize Army</h2>
      <Input
        type="number"
        placeholder="Number of archers"
        value={archers}
        onChange={(e) => setArchers(parseInt(e.target.value) || 0)}
      />
      <Input
        type="number"
        placeholder="Number of infantry"
        value={infantry}
        onChange={(e) => setInfantry(parseInt(e.target.value) || 0)}
      />
      <Input
        type="number"
        placeholder="Number of cavalry"
        value={cavalry}
        onChange={(e) => setCavalry(parseInt(e.target.value) || 0)}
      />
      <Button onClick={handleMobilizeArmy} disabled={!account}>
        Mobilize Army
      </Button>
    </div>
  );
};