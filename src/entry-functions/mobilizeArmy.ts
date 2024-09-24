import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type MobilizeArmyArguments = {
  archers: number;
  infantry: number;
  cavalry: number;
};

export const mobilizeArmy = (args: MobilizeArmyArguments): InputTransactionData => {
  const { archers, infantry, cavalry } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::warlords::mobilize`,
      functionArguments: [archers, infantry, cavalry],
    },
  };
};