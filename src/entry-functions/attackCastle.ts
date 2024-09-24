import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export const attackCastle = (): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::warlords::attack`,
      functionArguments: [],
    },
  };
};