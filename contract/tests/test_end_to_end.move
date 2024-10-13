#[test_only]
module warlords_addr::test_end_to_end {
    // use std::string;
    // use std::signer;

    // use aptos_framework::account;
    // use aptos_framework::timestamp;
    // use aptos_framework::randomness;

    // use warlords_addr::warlords;
    // use warlords_addr::constants;

    // const ALICE_ADDRESS: address = @0xA11CE;
    // const BOB_ADDRESS: address = @0xB0B;

    // // Setup function to initialize the module and create test accounts
    // fun setup_test(aptos_framework: &signer, warlords_addr: &signer): (signer, signer) {
    //     timestamp::set_time_has_started_for_testing(aptos_framework);

    //     warlords::init_module_for_test(warlords_addr);

    //     randomness::initialize_for_testing(aptos_framework);
    //     randomness::set_seed(x"0000000000000000000000000000000000000000000000000000000000000000");

    //     let alice = account::create_account_for_test(ALICE_ADDRESS);
    //     let bob = account::create_account_for_test(BOB_ADDRESS);
    //     (alice, bob)
    // }

    // #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    // fun test_end_to_end_battle(aptos_framework: &signer, warlords_addr: &signer) {
    //     // Setup test
    //     let (alice, bob) = setup_test(aptos_framework, warlords_addr);

    //     // Test after initialization
    //     let (king, defense, weather, _, _) = warlords::get_castle_info();

    //     // In the beginning, king is the deployer
    //     assert!(king == @warlords_addr, 0);
    //     // Weather defaults to CLEAR
    //     assert!(weather == constants::clear(), 1);

    //     // Defense gets default defending army
    //     let (archers, cavalry, infantry) = warlords::get_army_details(&defense);
    //     assert!(archers == 500 && cavalry == 500 && infantry == 500, 2);

    //     // Player Alice joins the game
    //     warlords::join_game(&alice, string::utf8(b"Napoleon"));

    //     // Check player status for Alice after joining
    //     let (general, army, turns, points) = warlords::get_player_state(ALICE_ADDRESS);
    //     assert!(general == string::utf8(b"Napoleon"), 3);
    //     let (archers, cavalry, infantry) = warlords::get_army_details(&army);
    //     assert!(archers == 500 && cavalry == 500 && infantry == 500, 4);
    //     assert!(turns == constants::initial_turn(), 5);
    //     assert!(points == 0, 6);

    //     // Alice mobilizes their army
    //     warlords::mobilize(&alice, 700, 700, 600);

    //     // Check player state for Alice after mobilization
    //     let (_, army, turns, _) = warlords::get_player_state(ALICE_ADDRESS);
    //     let (archers, cavalry, infantry) = warlords::get_army_details(&army);
    //     assert!(archers == 700 && cavalry == 700 && infantry == 600, 7);
    //     assert!(turns == constants::initial_turn() - constants::turns_needed_to_mobilize(), 8);

    //     // Simulate time passing and tick the game
    //     timestamp::fast_forward_seconds(constants::tick_interval() + 1);
    //     warlords::tick_tock();

    //     // Alice Attacks
    //     warlords::attack_for_test(&alice);

    //     // Check the castle state
    //     let (king, defense, _, _, _) = warlords::get_castle_info();
    //     // Alice should now be king
    //     assert!(king == ALICE_ADDRESS, 9);
    //     // Defense gets default defending army
    //     let (archers, cavalry, infantry) = warlords::get_army_details(&defense);
    //     assert!(archers == 500 && cavalry == 500 && infantry == 500, 10);

    //     // Check Alice's state
    //     let (_, _, turns, points) = warlords::get_player_state(ALICE_ADDRESS);
    //     assert!(turns == constants::initial_turn() - constants::turns_needed_to_mobilize() - constants::turns_needed_to_attack() + 1, 11);
    //     assert!(points == 1, 12);

    //     // Alice sets defense for the castle
    //     warlords::defend(&alice, 600, 500, 400);

    //     // Check the castle state after setting defense
    //     let (_, defense, _, _, _) = warlords::get_castle_info();
    //     let (archers, cavalry, infantry) = warlords::get_army_details(&defense);
    //     assert!(archers == 600 && cavalry == 500 && infantry == 400, 13);

    //     // Bob joins the game
    //     warlords::join_game(&bob, string::utf8(b"Brutus"));

    //     // Check player status for Bob after joining
    //     let (general, army, turns, points) = warlords::get_player_state(BOB_ADDRESS);
    //     assert!(general == string::utf8(b"Brutus"), 14);
    //     let (archers, cavalry, infantry) = warlords::get_army_details(&army);
    //     assert!(archers == 500 && cavalry == 500 && infantry == 500, 15);
    //     assert!(turns == constants::initial_turn(), 16);
    //     assert!(points == 0, 17);

    //     // Bob mobilizes his army
    //     warlords::mobilize(&bob, 700, 700, 600);

    //     // Simulate time passing and tick the game multiple times
    //     for (_i in 0..3) {
    //         timestamp::fast_forward_seconds(constants::tick_interval() + 1);
    //         warlords::tick_tock();
    //     };

    //     // Bob attacks Castle (held by Alice) - It might fail due to randomness
    //     warlords::attack_for_test(&bob);

    //     // Set weather to rainy to change battle dynamics
    //     timestamp::fast_forward_seconds(constants::weather_change_interval() + 1);
    //     warlords::set_weather(warlords_addr, constants::rain());

    //     // Check the castle state
    //     let (_, _, weather, _, _) = warlords::get_castle_info();
    //     assert!(weather == constants::rain(), 18);

    //     // Bob attacks again with rainy weather
    //     warlords::attack_for_test(&bob);

    //     // Check the castle state - Bob might be the new king depending on the random factor
    //     let (king, _, _, _, _) = warlords::get_castle_info();
    //     if (king == BOB_ADDRESS) {
    //         let (_, _, _, points) = warlords::get_player_state(BOB_ADDRESS);
    //         assert!(points == 1, 19);
    //     } else {
    //         assert!(king == ALICE_ADDRESS, 20);
    //     };

    //      // Check the highest scorer
    //     let (highest_scorer, highest_score) = warlords::get_highest_scorer();
    //     assert!(highest_score == 1, 21);
    //     assert!(highest_scorer == ALICE_ADDRESS || highest_scorer == BOB_ADDRESS, 22);
    // }
}