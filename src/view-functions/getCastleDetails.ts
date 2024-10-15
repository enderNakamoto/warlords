import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants"

interface DefenseArmy {
  archers: number;
  cavalry: number;
  infantry: number;
}

export const getCastleDetails = async (): Promise<{
  kingAddress: string;
  kingName: string;
  defenseArmy: DefenseArmy;
  weatherValue: number;
  lastWeatherChange: number;
  lastKingChange: number;
}> => {
  const response = await aptosClient().view<[string, string, DefenseArmy, number, number, number]>({
    payload: {
      function: `${MODULE_ADDRESS}::warlords::get_castle_info`,
      typeArguments: [],
      functionArguments: [],
    },
  });

  const [kingAddress, kingName, defenseArmy, weatherValue, lastWeatherChange, lastKingChange] = response;

  return {
    kingAddress,
    kingName,
    defenseArmy,
    weatherValue,
    lastWeatherChange,
    lastKingChange
  };
};