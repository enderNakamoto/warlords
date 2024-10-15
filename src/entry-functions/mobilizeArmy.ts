import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type MobilizeArmyArguments = {
  archers: number;
  cavalry: number;
  infantry: number;
};

export const mobilizeArmy = (args: MobilizeArmyArguments): InputTransactionData => {
  const { archers, cavalry, infantry } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::warlords::mobilize`,
      functionArguments: [archers, cavalry, infantry],
    },
  };
};