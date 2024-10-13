module warlords_addr::constants {

    // ================================= Errors ================================= //

    // Error indicating that Army size is not valid
    const ERR_INVALID_ARMY_SIZE: u64 = 1;
    // Error indicating that not enough turns are left for the action
    const ERR_NOT_ENOUGH_TURNS: u64 = 2;
    // Error indicating that the signer is not the king
    const ERR_NOT_KING: u64 = 3;
    // error code indicating that someone other than weatherman tried to change weather
    const ERR_NOT_WEATHERMAN: u64 = 4;
    // Error code indicating that the weatherman is trying to set a different weather
    const ERR_INVALID_WEATHER: u64 = 5;
    // Error code indicating that a player cannot attack themselves
    const ERR_CANNOT_ATTACK_SELF: u64 = 6;
    // Error code indicating that the last tick was too soon, min tick interval need to pass
    const ERR_TICK_TOO_SOON: u64 = 7;
    // Error code indicating that the last tick was too soon, min tick interval need to pass
    const ERR_WEATHER_CHANGE_TOO_SOON: u64 = 8;
    // Error code indicating player has already joined the game
    const ERR_ALREADY_JOINED: u64 = 9;
    // Error code indicating player has NOT joined the game
    const ERR_NOT_JOINED: u64 = 10;

    // ================================= Constants ============================== //

    const TICK_INTERVAL: u64 = 3599; // 1 hour in seconds - 1 seconds 
    const WEATHER_CHANGE_INTERVAL: u64 = 3599; // 1 hour in seconds - 1 seconds
    const MAX_TURNS: u64 = 100;
    const MAX_DEFENSE_SIZE: u64 = 1600;
    const MAX_ATTACKER_SIZE: u64 = 2000;
    const INITIAL_TURN: u64 = 10;
    const WEATHER_BONUS_MULTIPLIER: u64 = 15; // 15% bonus
    const TURNS_NEEDED_TO_MOBILIZE: u64 = 1; 
    const TURNS_NEEDED_TO_ATTACK: u64 = 3;
    
    // possible weather conditions that can be set
    const CLEAR: u8 = 0;
    const CLOUDS: u8 = 1;
    const SNOW: u8 = 2;
    const RAIN: u8 = 3;
    const DRIZZLE: u8 = 4;
    const THUNDERSTORM: u8 = 5;

    // unit strength modifiers - Percentage modifiers (to avoid floating-point operations)
    const EXTREME_ADVANTAGE: u64 = 125; // 25% advantage
    const SIGNIFICANT_ADVANTAGE: u64 = 115; // 15% advantage
    const NO_EFFECT: u64 = 100;
    const SIGNIFICANT_DISADVANTAGE: u64 = 85; // 15% disadvantage
    const EXTREME_DISADVANTAGE: u64 = 75; // 25% disadvantage
    const SEVERE_DISADVANTAGE: u64 = 50; // 50% disadvantage

    // max random modifier
    const MAX_RANDOM_MODIFIER: u64 = 1000; 

    // Public functions to access error constants
    public fun err_invalid_army_size(): u64 { ERR_INVALID_ARMY_SIZE }
    public fun err_not_enough_turns(): u64 { ERR_NOT_ENOUGH_TURNS }
    public fun err_not_king(): u64 { ERR_NOT_KING }
    public fun err_not_weatherman(): u64 { ERR_NOT_WEATHERMAN }
    public fun err_invalid_weather(): u64 { ERR_INVALID_WEATHER }
    public fun err_cannot_attack_self(): u64 { ERR_CANNOT_ATTACK_SELF }
    public fun err_tick_too_soon(): u64 { ERR_TICK_TOO_SOON }
    public fun err_weather_change_too_soon(): u64 { ERR_WEATHER_CHANGE_TOO_SOON }
    public fun err_already_joined(): u64 { ERR_ALREADY_JOINED }
    public fun err_not_joined(): u64 { ERR_NOT_JOINED }

    // Public functions to access game constants
    public fun tick_interval(): u64 { TICK_INTERVAL }
    public fun weather_change_interval(): u64 { WEATHER_CHANGE_INTERVAL }
    public fun max_turns(): u64 { MAX_TURNS }
    public fun max_defense_size(): u64 { MAX_DEFENSE_SIZE }
    public fun max_attacker_size(): u64 { MAX_ATTACKER_SIZE }
    public fun initial_turn(): u64 { INITIAL_TURN }
    public fun weather_bonus_multiplier(): u64 { WEATHER_BONUS_MULTIPLIER }
    public fun turns_needed_to_mobilize(): u64 { TURNS_NEEDED_TO_MOBILIZE }
    public fun turns_needed_to_attack(): u64 { TURNS_NEEDED_TO_ATTACK }

    // Public functions to access weather constants
    public fun clear(): u8 { CLEAR }
    public fun clouds(): u8 { CLOUDS }
    public fun snow(): u8 { SNOW }
    public fun rain(): u8 { RAIN }
    public fun drizzle(): u8 { DRIZZLE }
    public fun thunderstorm(): u8 { THUNDERSTORM }

    // Public functions to access strength modifiers
    public fun extreme_advantage(): u64 { EXTREME_ADVANTAGE }
    public fun significant_advantage(): u64 { SIGNIFICANT_ADVANTAGE }
    public fun no_effect(): u64 { NO_EFFECT }
    public fun significant_disadvantage(): u64 { SIGNIFICANT_DISADVANTAGE }
    public fun extreme_disadvantage(): u64 { EXTREME_DISADVANTAGE }
    public fun severe_disadvantage(): u64 { SEVERE_DISADVANTAGE }

    public fun max_random_modifier(): u64 { MAX_RANDOM_MODIFIER }
}