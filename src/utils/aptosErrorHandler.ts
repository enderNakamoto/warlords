import { AptosApiError } from "@aptos-labs/ts-sdk";

interface ParsedError {
    subStatus: number | null;
}

function parseAptosError(errorMessage: string): ParsedError {
    let parsed: ParsedError = {
      subStatus: null,
    };
    if (!errorMessage) return parsed;
    const subStatusMatch = errorMessage.match(/sub_status: Some\((\d+)\)/);
    if (subStatusMatch) {
      parsed.subStatus = parseInt(subStatusMatch[1], 10);
    }
    return parsed;
}

export const handleAptosError = (error: any) => {
    if (error instanceof AptosApiError && error.message && typeof error.message === 'string') {
        const parsedError = parseAptosError(error.message);
        const status = parsedError.subStatus;
        console.log("Parsed Error Status:", status);
        if (!status) return null;
        switch (status) {
            case 1: // ERR_INVALID_ARMY_SIZE
                console.error("Aptos API Error:", "ERR_INVALID_ARMY_SIZE", status);
                return "Army size is not valid.";
            case 2: // ERR_NOT_ENOUGH_TURNS
                console.error("Aptos API Error:", "ERR_NOT_ENOUGH_TURNS", status);
                return "Not enough turns are left for the action.";
            case 3: // ERR_NOT_KING
                console.error("Aptos API Error:", "ERR_NOT_KING", status);
                return "Player is not the King.";
            case 4: // ERR_NOT_WEATHERMAN
                console.error("Aptos API Error:", "ERR_NOT_WEATHERMAN", status);
                return "Player is not the Weatherman.";
            case 5: // ERR_INVALID_WEATHER
                console.error("Aptos API Error:", "ERR_INVALID_WEATHER", status);
                return "Trying to set an invalid weather.";
            case 6: // ERR_CANNOT_ATTACK_SELF
                console.error("Aptos API Error:", "ERR_CANNOT_ATTACK_SELF", status);
                return "Players cannot attack themselves.";
            case 7: // ERR_TICK_TOO_SOON
                console.error("Aptos API Error:", "ERR_TICK_TOO_SOON", status);
                return "The last tick was too soon, minimum interval needs to pass.";
            case 8: // ERR_ALREADY_JOINED
                console.error("Aptos API Error:", "ERR_ALREADY_JOINED", status);
                return "Player has already joined the game.";
            case 9: // ERR_NOT_JOINED
                console.error("Aptos API Error:", "ERR_NOT_JOINED", status);
                return "Player has not joined the game yet.";
            default:
                console.error("Unknown Aptos API Error Occurred:", status);
                return null;
        }
    } else {
        console.error("Unexpected Aptos Error:", error);
        return null;
    }
};