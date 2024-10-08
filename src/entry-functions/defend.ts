import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type DefendArmyArguments = {
  archers: number;
  infantry: number;
  cavalry: number;
};

export const defend = (args: DefendArmyArguments): InputTransactionData => {
  const { archers, infantry, cavalry } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::warlords::defend`,
      functionArguments: [archers, infantry, cavalry],
    },
  };
};