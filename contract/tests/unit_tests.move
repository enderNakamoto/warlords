#[test_only]
module warlords_addr::unit_tests {

    use std::string;
    use std::vector;

    use aptos_framework::account;
    use aptos_framework::timestamp;

    use warlords_addr::warlords;
    use warlords_addr::constants;

    // Errors
    const ERR_INVALID_ARMY_SIZE: u64 = 1;
    const ERR_NOT_ENOUGH_TURNS: u64 = 2;
    const ERR_NOT_KING: u64 = 3;
    const ERR_NOT_WEATHERMAN: u64 = 4;
    const ERR_INVALID_WEATHER: u64 = 5;
    const ERR_CANNOT_ATTACK_SELF: u64 = 6;
    const ERR_TICK_TOO_SOON: u64 = 7;
    const ERR_WEATHER_CHANGE_TOO_SOON: u64 = 8;
    const ERR_ALREADY_JOINED: u64 = 9;
    const ERR_NOT_JOINED: u64 = 10;

    // Test accounts
    const ALICE_ADDRESS: address = @0xA11CE;
    const BOB_ADDRESS: address = @0xB0B;

    // Setup function to initialize the module and create test accounts
    fun setup_test(aptos_framework: &signer, warlords_addr: &signer): (signer, signer) {
        account::create_account_for_test(@0x1);
        timestamp::set_time_has_started_for_testing(aptos_framework);

        warlords::init_module_for_test(warlords_addr);

        let alice = account::create_account_for_test(ALICE_ADDRESS);
        let bob = account::create_account_for_test(BOB_ADDRESS);
        (alice, bob)
    }

    // Test the join_game function
    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    fun test_join_game(aptos_framework: &signer, warlords_addr: &signer) {
        let (alice, _bob) = setup_test(aptos_framework, warlords_addr);

        let alice_name = string::utf8(b"Alice");
        warlords::join_game(&alice, alice_name);

        // check player state for Alice after joining    
        let (name, army, turns, points) = warlords::get_player_state(ALICE_ADDRESS);
        assert!(name == alice_name, 0);

        let (archers, cavalry, infantry) = warlords::get_army_details(&army);
        assert!(archers == 500 && cavalry == 500 && infantry == 500, 1);
        assert!(turns == constants::initial_turn(), 2);
        assert!(points == 0, 3);

        // Check that Alice has been added to the list of players
        let players = warlords::get_player_addresses();
        assert!(vector::contains(&players, &ALICE_ADDRESS), 4);
    }

    // Test the mobilize function
    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    fun test_mobilize_success(aptos_framework: &signer, warlords_addr: &signer) {
        let (alice, _bob) = setup_test(aptos_framework, warlords_addr);

        // Alice joins the game
        warlords::join_game(&alice, string::utf8(b"Alice"));

        // Initial state check
        let (_, initial_army, initial_turns, _) = warlords::get_player_state(ALICE_ADDRESS);
        let (initial_archers, initial_cavalry, initial_infantry) = warlords::get_army_details(&initial_army);
        assert!(initial_archers == 500 && initial_cavalry == 500 && initial_infantry == 500, 0);
        assert!(initial_turns == constants::initial_turn(), 1);

        // Alice mobilizes her army
        warlords::mobilize(&alice, 600, 700, 600);

        // Check state after mobilization
        let (_, new_army, new_turns, _) = warlords::get_player_state(ALICE_ADDRESS);
        let (new_archers, new_cavalry, new_infantry) = warlords::get_army_details(&new_army);
        assert!(new_archers == 600 && new_cavalry == 700 && new_infantry == 600, 2);
        assert!(new_turns == initial_turns - constants::turns_needed_to_mobilize(), 3);
    }

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    #[expected_failure(abort_code = ERR_INVALID_ARMY_SIZE,location = warlords_addr::warlords)]
    fun test_mobilize_failure_invalid_army_size(aptos_framework: &signer, warlords_addr: &signer) {
        let (alice, _bob) = setup_test(aptos_framework, warlords_addr);

        // Alice joins the game
        warlords::join_game(&alice, string::utf8(b"Alice"));

        // Alice tries to mobilize with an invalid army size (exceeding MAX_ATTACKER_SIZE)
        warlords::mobilize(&alice, 1000, 1000, 1000); // Total: 3000, which should exceed MAX_ATTACKER_SIZE
    }

    // Test the set weather function
    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    fun test_set_weather_success(aptos_framework: &signer, warlords_addr: &signer) {
        setup_test(aptos_framework, warlords_addr);

        // Fast forward time to allow weather change
        timestamp::fast_forward_seconds(constants::weather_change_interval() + 1);

        // Set weather to RAIN
        warlords::set_weather(warlords_addr, constants::rain());

        // Check if weather was set correctly
        let (_, _, current_weather, _, _) = warlords::get_castle_info();
        assert!(current_weather == constants::rain(), 0);

        // Fast forward time again
        timestamp::fast_forward_seconds(constants::weather_change_interval() + 1);

        // Change weather to CLEAR
        warlords::set_weather(warlords_addr, constants::clear());

        // Check if weather was updated
        let (_, _, new_weather, _, _) = warlords::get_castle_info();
        assert!(new_weather == constants::clear(), 1);
    }

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    #[expected_failure(abort_code = ERR_WEATHER_CHANGE_TOO_SOON, location = warlords_addr::warlords)]
    fun test_set_weather_failure_too_soon(aptos_framework: &signer, warlords_addr: &signer) {
        setup_test(aptos_framework, warlords_addr);

        // Set weather to RAIN
        warlords::set_weather(warlords_addr, constants::rain());

        // Attempt to change weather immediately (should fail)
        warlords::set_weather(warlords_addr, constants::clear());
    }

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    #[expected_failure(abort_code = ERR_INVALID_WEATHER, location = warlords_addr::warlords)]
    fun test_set_weather_failure_invalid_weather(aptos_framework: &signer, warlords_addr: &signer) {
        setup_test(aptos_framework, warlords_addr);

        // Fast forward time to allow weather change
        timestamp::fast_forward_seconds(constants::weather_change_interval() + 1);

        // Attempt to set an invalid weather value (assuming 10 is not a valid weather constant)
        warlords::set_weather(warlords_addr, 10);
    }

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr, alice = @0xA11CE)]
    #[expected_failure(abort_code = ERR_NOT_WEATHERMAN, location = warlords_addr::warlords)]
    fun test_set_weather_failure_not_weatherman(aptos_framework: &signer, warlords_addr: &signer, alice: &signer) {
        setup_test(aptos_framework, warlords_addr);

        // Fast forward time to allow weather change
        timestamp::fast_forward_seconds(constants::weather_change_interval() + 1);

        // Attempt to set weather with a non-weatherman account (Alice)
        warlords::set_weather(alice, constants::rain());
    }

    // Test the tick tock function
    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    fun test_tick_tock_success(aptos_framework: &signer, warlords_addr: &signer) {
        let (alice, bob) = setup_test(aptos_framework, warlords_addr);

        // Alice and Bob join the game
        warlords::join_game(&alice, string::utf8(b"Alice"));
        warlords::join_game(&bob, string::utf8(b"Bob"));

        // Get initial game turn and player turns
        let initial_game_turn = warlords::get_game_turn();
        let (_, _, alice_initial_turns, _) = warlords::get_player_state(ALICE_ADDRESS);
        let (_, _, bob_initial_turns, _) = warlords::get_player_state(BOB_ADDRESS);

        // Fast forward time to allow tick
        timestamp::fast_forward_seconds(constants::tick_interval() + 1);

        // Perform tick
        warlords::tick_tock();

        // Check if game turn increased
        assert!(warlords::get_game_turn() == initial_game_turn + 1, 0);

        // Check if player turns increased
        let (_, _, alice_new_turns, _) = warlords::get_player_state(ALICE_ADDRESS);
        let (_, _, bob_new_turns, _) = warlords::get_player_state(BOB_ADDRESS);
        assert!(alice_new_turns == alice_initial_turns + 1, 1);
        assert!(bob_new_turns == bob_initial_turns + 1, 2);

        // Check if last tick timestamp updated
        assert!(warlords::get_last_tick_timestamp() == timestamp::now_seconds(), 3);
    }

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    #[expected_failure(abort_code = ERR_TICK_TOO_SOON, location = warlords_addr::warlords)]
    fun test_tick_tock_failure_too_soon(aptos_framework: &signer, warlords_addr: &signer) {
        setup_test(aptos_framework, warlords_addr);

        // Perform first tick
        warlords::tick_tock();

        // Attempt to tick again immediately (should fail)
        warlords::tick_tock();
    }

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    fun test_tick_tock_max_turns(aptos_framework: &signer, warlords_addr: &signer) {
        let (alice, _) = setup_test(aptos_framework, warlords_addr);

        // Alice joins the game
        warlords::join_game(&alice, string::utf8(b"Alice"));

        // Set Alice's turns to MAX_TURNS - 1
        let max_turns = constants::max_turns();
        warlords::set_player_turns_for_test(&alice, max_turns - 1);

        // Fast forward time to allow tick
        timestamp::fast_forward_seconds(constants::tick_interval() + 1);

        // Perform tick
        warlords::tick_tock();

        // Check if Alice's turns are capped at MAX_TURNS
        let (_, _, alice_turns, _) = warlords::get_player_state(ALICE_ADDRESS);
        assert!(alice_turns == max_turns, 0);

        // Perform another tick
        timestamp::fast_forward_seconds(constants::tick_interval() + 1);
        warlords::tick_tock();

        // Check if Alice's turns are still capped at MAX_TURNS
        let (_, _, alice_turns, _) = warlords::get_player_state(ALICE_ADDRESS);
        assert!(alice_turns == max_turns, 1);
    }

}