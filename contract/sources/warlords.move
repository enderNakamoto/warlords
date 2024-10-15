module warlords_addr::warlords {

    // ================================= Imports ================================= //
    use std::signer;
    use std::string::String;
    use std::vector;
    
    use aptos_framework::timestamp;
    use aptos_framework::randomness;
    use aptos_framework::event;

    use warlords_addr::constants;

    // ================================= State/Structs/Enums ================================== //

    // Struct used as Global state for Castle Defense, 
    // Also used as Unique state for a player's Mobilized Army
    struct Army has store, drop, copy {
        archers: u64,
        cavalry: u64,
        infantry: u64,
    }

    // Global state for Castle's weather
    struct Weather has store, drop {
        value: u8,
        last_weather_change: u64
    }

    // Global state of the castles that everyone tries to capture
    struct Castle has store {
        king: address,
        defense: Army,
        weather: Weather,
        last_king_change: u64
    }

    // Global State holding game state 
    struct GameState has key {
        castle: Castle,
        weatherman: address,
        number_of_attacks: u64,
        game_turn: u64,
        last_tick_timestamp: u64,
        player_addresses: vector<address>, // all the players that joined the game
        highest_scorer: HighestScorer,
        mock_random: u64
    }

    // Store current leader address and points
    struct HighestScorer has store, drop {
        player_address: address,
        player_points: u64
    }

    // Unique state for a player's army and turn count
    struct PlayerState has key {
        general_name: String,
        army: Army,
        turns: u64,
        points : u64
    }

    // ================================= Events ================================== //

    #[event]
    struct AttackEvent has drop, store {
        attacker: address,
        defender: address,
        attacker_army: Army,
        defender_army: Army,
        attacker_points: u64,
        attaker_name: String,
        winner: address,
    }

    #[event]
    struct TickEvent has drop, store {
        game_turn: u64,
        timestamp: u64,
    }

    // ================================= Module Init ================================== //

    fun init_module(sender: &signer) {
        let sender_addr = signer::address_of(sender);
        
        move_to(sender, GameState {
            castle: Castle {
                king: sender_addr,
                defense: Army { archers: 500, cavalry: 500, infantry: 500 },
                weather: Weather { value: constants::clear(), last_weather_change: timestamp::now_seconds() },
                last_king_change: timestamp::now_seconds()
            },
            weatherman: sender_addr,
            number_of_attacks: 0,
            game_turn: 0,
            last_tick_timestamp: 0,
            player_addresses: vector::empty<address>(),
            highest_scorer: HighestScorer { player_address: sender_addr, player_points: 0 },
            mock_random: 0
        });
    }


    // ======================== Write functions ========================

    public entry fun join_game(sender: &signer, general_name: String) acquires GameState {
        let sender_addr = signer::address_of(sender);

        assert!(!exists<PlayerState>(sender_addr), constants::err_already_joined());

        move_to(sender, PlayerState {
            general_name: general_name,
            army: Army { archers: 500, cavalry: 500, infantry: 500 },
            turns: constants::initial_turn(),
            points: 0
        });

        // Add player address to the GameState
        let game_state = borrow_global_mut<GameState>(@warlords_addr);
        vector::push_back(&mut game_state.player_addresses, sender_addr);
    }

    public entry fun mobilize(
        sender: &signer, 
        archers: u64, 
        cavalry: u64, 
        infantry: u64
    ) acquires PlayerState {
        let sender_addr = signer::address_of(sender);
        assert!(exists<PlayerState>(sender_addr), constants::err_not_joined());

        let player_state = borrow_global_mut<PlayerState>(sender_addr);
        assert!(player_state.turns >= constants::turns_needed_to_mobilize(), constants::err_not_enough_turns());

        let army = Army { archers, cavalry, infantry };
        assert!(calculate_base_strength(&army) <= constants::max_attacker_size(), constants::err_invalid_army_size());

        player_state.army = army;
        player_state.turns = player_state.turns - 1;
    }

    // Attack function to attack the castle based on the current weather and random bonus
    // Since it uses the random api, it is marked as private
    // We prevent undergasing attack by making sure both winning and losing paths have same gas costs
    // in our case, we do the same calculations regardless of the random outcome
    #[randomness]
    entry fun attack(attacker: &signer) acquires PlayerState, GameState {

        let attacker_addr = signer::address_of(attacker);
        let attacker_state = borrow_global_mut<PlayerState>(attacker_addr);

        // players can only attack if they have enough turns 
        assert!(attacker_state.turns >= constants::turns_needed_to_attack(), constants::err_not_enough_turns());

        // players cannot attack themselves
        let game_state = borrow_global_mut<GameState>(@warlords_addr);
        assert!(game_state.castle.king != attacker_addr, constants::err_cannot_attack_self());

        let attacker_strength = calculate_effective_strength(&attacker_state.army, game_state.castle.weather.value);
        let defender_strength = calculate_effective_strength(&game_state.castle.defense, game_state.castle.weather.value);

        // random bonus to the defender strength
        // defenders have a max of 1600 strength, attackers have a max of 2000 strength
        // to give defenders an advantage, we will give them a random bonus
        // random bonus is between 0 and 1000, when random bonus is below 0-400, attacker wins, between 400-1000, defender wins
        // the chance of defender winning is (1000 - 400)/1000 = 60%
        // therefore, to beat the defender, attacker must time the attack with a good weather
        let random_bonus = randomness::u64_range(constants::no_effect(), constants::max_random_modifier());
        if (game_state.mock_random != 0) {
            random_bonus = game_state.mock_random;
        };
        defender_strength = defender_strength + random_bonus;

        let winner: address;
        let default_defense_army: Army = Army { archers: 500, cavalry: 500, infantry: 500 };

        if (attacker_strength > defender_strength) {
            // Attacker wins
            game_state.castle.king = attacker_addr;
            game_state.castle.defense = default_defense_army;
            game_state.castle.last_king_change = timestamp::now_seconds();
            winner = attacker_addr;
            attacker_state.points = attacker_state.points + 1;
            if (attacker_state.points > game_state.highest_scorer.player_points) {
                game_state.highest_scorer = HighestScorer { player_address: attacker_addr, player_points: attacker_state.points };
            }
        } else {
            // Defender wins
            winner = game_state.castle.king;
        };

        attacker_state.turns = attacker_state.turns - constants::turns_needed_to_attack();
        game_state.number_of_attacks = game_state.number_of_attacks + 1;

        event::emit(AttackEvent {
            attacker: attacker_addr,
            defender: game_state.castle.king,
            attacker_army: attacker_state.army,
            defender_army: game_state.castle.defense,
            attacker_points: attacker_state.points,
            attaker_name: attacker_state.general_name,
            winner,
        });

    }

    public entry fun defend(sender: &signer, archers: u64, cavalry: u64, infantry: u64) acquires GameState {
        let sender_addr = signer::address_of(sender);
        let game_state_mut = borrow_global_mut<GameState>(@warlords_addr);

        // only the current castle king can change the castle defense 
        assert!(game_state_mut.castle.king == sender_addr, constants::err_not_king());

        let army = Army { archers, cavalry, infantry };
        // defending army has to follow game rules
        assert!(calculate_base_strength(&army) <= constants::max_defense_size(), constants::err_invalid_army_size());

        game_state_mut.castle.defense = army;
    }

    public entry fun set_weather(sender: &signer, new_weather: u8) acquires GameState {
        // let sender_addr = signer::address_of(sender);
        let game_state_mut = borrow_global_mut<GameState>(@warlords_addr);

        // make sure weather is not changed too soon
        // let current_time = timestamp::now_seconds();
        // assert!(
        //     current_time >= game_state_mut.last_tick_timestamp + constants::weather_change_interval(), 
        //     constants::err_weather_change_too_soon()
        // );

        // only the weatherman can set valid weather
        // assert!(game_state_mut.weatherman == sender_addr, constants::err_not_weatherman());

        // make sure the weather is valid
        assert!(new_weather <= constants::thunderstorm(), constants::err_invalid_weather());

        game_state_mut.castle.weather = Weather { 
            value: new_weather, 
            last_weather_change: timestamp::now_seconds() 
        };
    }

    // no need to gate it, anyone should be able to advance the game state (turns)
    public entry fun tick_tock() acquires GameState, PlayerState {
        let game_state_mut = borrow_global_mut<GameState>(@warlords_addr);
        let current_time = timestamp::now_seconds();
        let new_game_turn = game_state_mut.game_turn + 1;

        // make sure turns are not increased prematurely
        assert!(
            current_time >= game_state_mut.last_tick_timestamp + constants::tick_interval(), 
            constants::err_tick_too_soon()
        );


        game_state_mut.last_tick_timestamp = current_time;
        game_state_mut.game_turn = new_game_turn;
        
        // go through all the players, and increase their turns 
        let players = &game_state_mut.player_addresses;
        let len = vector::length<address>(players);

        for (i in 0..len) {
            let addr = *vector::borrow(players, i);
            let player_state = borrow_global_mut<PlayerState>(addr);
            if (player_state.turns < constants::max_turns()) {
                player_state.turns = player_state.turns + 1;
            }
        };

        event::emit(TickEvent {
            timestamp: current_time,
            game_turn: new_game_turn
        });
    }

    // ======================== Read Functions ========================

    #[view]
    public fun get_castle_info(): (address, Army, u8, u64, u64) acquires GameState {
        let game_state = borrow_global<GameState>(@warlords_addr);
        (
            game_state.castle.king,
            game_state.castle.defense,
            game_state.castle.weather.value,
            game_state.castle.weather.last_weather_change,
            game_state.castle.last_king_change
        )
    }

    #[view]
    public fun get_player_addresses(): vector<address> acquires GameState {
        *&borrow_global<GameState>(@warlords_addr).player_addresses
    }


    #[view]
    public fun get_player_state(player: address): (String, Army, u64, u64) acquires PlayerState {
        assert!(exists<PlayerState>(player), constants::err_not_joined());
        let player_state = borrow_global<PlayerState>(player);
        (player_state.general_name, player_state.army, player_state.turns, player_state.points)
    }

    #[view]
    public fun get_last_tick_timestamp(): u64 acquires GameState {
        let game_state = borrow_global<GameState>(@warlords_addr);
        game_state.last_tick_timestamp
    }

    #[view]
    public fun get_last_king_timestamp(): u64 acquires GameState {
        let game_state = borrow_global<GameState>(@warlords_addr);
        game_state.castle.last_king_change
    }

    #[view]
    public fun get_top_points(): u64 acquires GameState {
        let game_state = borrow_global<GameState>(@warlords_addr);
        game_state.highest_scorer.player_points
    }

    #[view]
    public fun get_game_turn(): u64 acquires GameState {
        borrow_global<GameState>(@warlords_addr).game_turn
    }

    #[view]
    public fun get_highest_scorer(): (address, u64) acquires GameState {
        let game_state = borrow_global<GameState>(@warlords_addr);
        (game_state.highest_scorer.player_address, game_state.highest_scorer.player_points)
    }

    #[view]
    public fun get_number_of_attacks(): u64 acquires GameState {
        borrow_global<GameState>(@warlords_addr).number_of_attacks
    }

    #[view]
    public fun get_weatherman(): address acquires GameState {
        borrow_global<GameState>(@warlords_addr).weatherman
    }

    // ======================== Helper functions ========================

    fun calculate_base_strength(army: &Army): u64 {
        army.archers + army.cavalry + army.infantry
    }

    fun calculate_effective_strength_random(army: &Army, weather: u8): u64 {
        let archers_strength = army.archers * get_archer_modifier(weather) / 100;
        let cavalry_strength = army.cavalry * get_cavalry_modifier(weather) / 100;
        let infantry_strength = army.infantry * get_infantry_modifier(weather) / 100;
        archers_strength + cavalry_strength + infantry_strength
    }

    fun calculate_effective_strength(army: &Army, weather: u8): u64 {
        let archers_strength = army.archers * get_archer_modifier(weather) / 100;
        let cavalry_strength = army.cavalry * get_cavalry_modifier(weather) / 100;
        let infantry_strength = army.infantry * get_infantry_modifier(weather) / 100;
        archers_strength + cavalry_strength + infantry_strength
    }

    fun get_archer_modifier(weather: u8): u64 {
        if (weather == constants::clear()) {
            constants::extreme_advantage()
        } else if (weather == constants::clouds()) {
            constants::significant_advantage()
        } else if (weather == constants::snow()) {
            constants::no_effect()
        } else if (weather == constants::rain() || weather == constants::drizzle()) {
            constants::significant_disadvantage()
        } else if (weather == constants::thunderstorm()) {
            constants::extreme_disadvantage()
        } else {
            constants::no_effect() // Default case, should never happen
        }
    }

    fun get_cavalry_modifier(weather: u8): u64 {
        if (weather == constants::clear()) {
            constants::significant_advantage()
        } else if (weather == constants::clouds()) {
            constants::extreme_advantage()
        } else if (weather == constants::snow() || weather == constants::drizzle()) {
            constants::significant_disadvantage()
        } else if (weather == constants::rain()) {
            constants::extreme_disadvantage()
        } else if (weather == constants::thunderstorm()) {
            constants::severe_disadvantage()
        } else {
            constants::no_effect() // Default case, should never happen
        }
    }

    fun get_infantry_modifier(weather: u8): u64 {
        if (weather == constants::clear() || weather == constants::clouds()) {
            constants::no_effect()
        } else if (weather == constants::drizzle() || weather == constants::snow()) {
            constants::significant_advantage()
        } else if (weather == constants::rain() || weather == constants::thunderstorm()) {
            constants::extreme_advantage()
        } else {
            constants::no_effect() // Default case, should never happen
        }
    }

    public fun get_army_strength(army: &Army): u64 {
        army.archers + army.cavalry + army.infantry
    }

    public fun get_army_details(army: &Army): (u64, u64, u64) {
        (army.archers, army.cavalry, army.infantry)
    }

    // ======================== Test Helper functions ========================

    #[test_only]
    public fun init_module_for_test(sender: &signer)  {
        init_module(sender);
    }

    #[test_only]
    #[lint::allow_unsafe_randomness]
    public fun attack_for_test(attacker: &signer) acquires PlayerState, GameState {
        attack(attacker);
    }

    #[test_only]
    public fun set_player_turns_for_test(player: &signer, turns: u64) acquires PlayerState {
        let player_addr = signer::address_of(player);
        assert!(exists<PlayerState>(player_addr), constants::err_not_joined());
        let player_state = borrow_global_mut<PlayerState>(player_addr);
        player_state.turns = turns;
    }

    #[test_only]
    public fun set_king_for_test(player: &signer) acquires GameState {
        let player_addr = signer::address_of(player);
        let game_state = borrow_global_mut<GameState>(@warlords_addr);
        game_state.castle.king = player_addr;
    }

    #[test_only]
    public fun set_turns_for_test(player: &signer, turns: u64) acquires PlayerState {
        let player_addr = signer::address_of(player);
        assert!(exists<PlayerState>(player_addr), constants::err_not_joined());
        let player_state = borrow_global_mut<PlayerState>(player_addr);
        player_state.turns = turns;
    }

    #[test_only]
    public fun set_mock_random_for_test(random: u64) acquires GameState {
        let game_state = borrow_global_mut<GameState>(@warlords_addr);
        game_state.mock_random = random;
    }

}