import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

export const getLastTurnsUpdateTime = async (): Promise<number> => {
  const response = await aptosClient().view<[number]>({
    payload:{
        function: `${MODULE_ADDRESS}::warlords::get_last_tick_timestamp`,
        functionArguments: [],
    },
  });
  const [lastTickTimestamp] = response;

  return lastTickTimestamp;
};