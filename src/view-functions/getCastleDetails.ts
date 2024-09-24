import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants"

// Add this interface
interface DefenseArmy {
  archers: string;
  cavalry: string;
  infantry: string;
}

export const getCastleDetails = async (): Promise<{
  kingAddress: string;
  defenseArmy: DefenseArmy;
  weatherValue: number;
}> => {
  const response = await aptosClient().view<[string, DefenseArmy, number]>({
    payload: {
      function: `${MODULE_ADDRESS}::warlords::get_castle_info`,
      typeArguments: [],
      functionArguments: [],
    },
  });

  const [kingAddress, defenseArmy, weatherValue] = response;

  return {
    kingAddress,
    defenseArmy,
    weatherValue,
  };
};