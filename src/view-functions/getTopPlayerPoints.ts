import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

export const getTopPlayerScore = async (): Promise<number> => {
  const response = await aptosClient().view<[number]>({
    payload:{
        function: `${MODULE_ADDRESS}::warlords::get_top_points`,
        functionArguments: [],
    },
  });
  const [playerPoints] = response;

  return playerPoints;
};