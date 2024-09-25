import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

// Define interfaces for the returned data
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

export const getPlayerState = async (playerAddress: string): Promise<PlayerState> => {
  const response = await aptosClient().view<[string, Army, number]>({
    payload:{
        function: `${MODULE_ADDRESS}::warlords::get_player_state`,
        functionArguments: [playerAddress],
    },
  });
  const [generalName, army, turns] = response;
  
  return {
    generalName,
    army,
    turns,
  };
};