import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type JoinGameArguments = {
  generalName: string;
};

export const joinGame = (args: JoinGameArguments): InputTransactionData => {
  const { generalName } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::warlords::join_game`,
      functionArguments: [generalName],
    },
  };
};