#[test_only]
module warlords_addr::test_end_to_end {
    use std::string;
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::timestamp;

    use warlords_addr::warlords;

    #[test(aptos_framework = @0x1, warlords_addr = @warlords_addr)]
    fun test_end_to_end(aptos_framework: &signer, warlords_addr: &signer) {
        // Set up the aptos framework for testing
        account::create_account_for_test(@0x1);
        timestamp::set_time_has_started_for_testing(aptos_framework);

        // Initialize the warlords module
        warlords::init_module_for_test(warlords_addr);

        // Test after initialization
        let (king, defense, weather) = warlords::get_castle_info();

        // in the beginning king is the deployer
        assert!(king == @warlords_addr, 5);
        // weather defaults to CLEAR (0)
        assert!(weather == 0, 4);

        // defense gets default defending army
        let (archers, cavalry, infantry) = warlords::get_army_details(&defense);
        assert!(archers == 500 && cavalry == 500 && infantry == 500, 1);


        // Create test accounts
        let alice = account::create_account_for_test(@0xCAFE);
        let bob = account::create_account_for_test(@0xFACE);

        // Player Alice joins the game
        warlords::join_game(&alice, string::utf8(b"Napoleon"));

        // Check player status for Alice after joining! 
        let (general, army, turns, points) = warlords::get_player_state(signer::address_of(&alice));
        assert!(general == string::utf8(b"Napoleon"), 0);
        let (archers, cavalry, infantry) = warlords::get_army_details(&army);
        assert!(archers == 500 && cavalry == 500 && infantry == 500, 1);
        assert!(warlords::get_army_strength(&army) == 1500, 2);
        assert!(turns == 10, 3);
        assert!(points == 0, 4);

        // Alice mobilizes their army - changes her army composition from default
        warlords::mobilize(&alice, 500, 510, 500);

        // Check player state for Alice after mobilization 
        let (_, army, turns, points) = warlords::get_player_state(signer::address_of(&alice));
        let (archers, cavalry, infantry) = warlords::get_army_details(&army);
        // army composition changed
        assert!(archers == 500 && cavalry == 510 && infantry == 500, 1); 
        assert!(warlords::get_army_strength(&army) == 1510, 2);
        // lost a turn trying to mobilize
        assert!(turns == 9, 3);
        assert!(points == 0, 4);

        for (i in 0..3) {
            // Simulate time passing
            timestamp::fast_forward_seconds(3601); // Move time forward by more than TICK_INTERVAL
            // Tick the game
            warlords::tick_tock();
        };
        let (_, _, turns, _) = warlords::get_player_state(signer::address_of(&alice));
        // gained 3 turns in three ticks
        assert!(turns == 12, 3); 


        // Alice Attacks - She should win as she has more strength
        warlords::attack(&alice);

        // Check the castle state
        let (king, defense, _) = warlords::get_castle_info();
        // Alice should now be king
        assert!(king == signer::address_of(&alice), 4); 
        // defense gets default defending army
        let (archers, cavalry, infantry) = warlords::get_army_details(&defense);
        assert!(archers == 500 && cavalry == 500 && infantry == 500, 1);

        // Check Alice's state 
        let (_, _, turns, points) = warlords::get_player_state(signer::address_of(&alice));
        // lost turns while attacking
        assert!(turns == 9, 3);
        // gained points for winning
        assert!(points == 1, 4);

        // Alice sets defense for the castle
        warlords::defend(&alice, 100, 101, 100);

         // Check the castle state after setting defense
        let (_, defense, _) = warlords::get_castle_info();
        // defense has now changed
        let (archers, cavalry, infantry) = warlords::get_army_details(&defense);
        assert!(archers == 100 && cavalry == 101 && infantry == 100, 1);
        assert!(warlords::get_army_strength(&defense) == 301, 2);

        // Bob joins the game! 
        warlords::join_game(&bob, string::utf8(b"Brutus"));

        // Check player status for Bob after joining! 
        let (general, army, turns, points) = warlords::get_player_state(signer::address_of(&bob));
        assert!(general == string::utf8(b"Brutus"), 0);
        let (archers, cavalry, infantry) = warlords::get_army_details(&army);
        assert!(archers == 500 && cavalry == 500 && infantry == 500, 1);
        assert!(warlords::get_army_strength(&army) == 1500, 2);
        assert!(turns == 10, 3); // starting with default turn of 2 
        assert!(points == 0, 4);

        // Bob mobilizes his army - changes army composition
        warlords::mobilize(&bob, 100, 71, 129);

        // Check player state for Bob after mobilization 
        let (_, army, turns, _) = warlords::get_player_state(signer::address_of(&bob));
        let (archers, cavalry, infantry) = warlords::get_army_details(&army);
        // army composition changed
        assert!(archers == 100 && cavalry == 71 && infantry == 129, 1); 
        assert!(warlords::get_army_strength(&army) == 300, 2);
        // lost a turn trying to mobilize
        assert!(turns == 9, 3);

        for (i in 0..3) {
            // Simulate time passing
            timestamp::fast_forward_seconds(3601); // Move time forward by more than TICK_INTERVAL
            // Tick the game
            warlords::tick_tock();
        };
        let (_, _, turns, _) = warlords::get_player_state(signer::address_of(&bob));
        // Bob ained 3 turns in three ticks
        assert!(turns == 12, 3); 

        // Bob attacks Castle(held by Alice) - It should fail as Alice is stronger
        warlords::attack(&bob);

        // Check the castle state
        let (king, _, _) = warlords::get_castle_info();
        // Alice should remain the king
        assert!(king == signer::address_of(&alice), 4); 

        // now set weather to rainy
        warlords::set_weather(warlords_addr, 3);
        // check the castle state 
        let (_, _, weather) = warlords::get_castle_info();
        // weather changed to RAINY (1)
        assert!(weather == 3, 4);

        // Now that the weather has changed, Bob is suddenly stronger as Alice's cavalry is weaker
        warlords::attack(&bob);
        // Check the castle state
        let (king, _, _) = warlords::get_castle_info();
        // Bob should be the new king
        assert!(king == signer::address_of(&bob), 4); 


        //Alice lowers the attack strength, and even with 5% bonus, she should lose
        warlords::mobilize(&alice, 50, 50, 50);
        warlords::attack_with_randomness_for_test(&alice);

        // // Check the castle state
        // let (king, _, _) = warlords::get_castle_info();
        // // Bob should remain the king
        // assert!(king == signer::address_of(&bob), 4);
    }
}