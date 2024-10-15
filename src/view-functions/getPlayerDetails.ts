import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

interface Army {
  archers: number;
  cavalry: number;
  infantry: number;
}

interface PlayerState {
  generalName: string;
  army: Army;
  turns: number;
  points: number;
}

export const getPlayerState = async (playerAddress: string): Promise<PlayerState> => {
  const response = await aptosClient().view<[string, Army, number, number]>({
    payload:{
        function: `${MODULE_ADDRESS}::warlords::get_player_state`,
        functionArguments: [playerAddress],
    },
  });
  const [generalName, army, turns, points] = response;
  
  return {
    generalName,
    army,
    turns,
    points
  };
};