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

        // Create test accounts
        let player1 = account::create_account_for_test(@0xCAFE);
        let player2 = account::create_account_for_test(@0xFACE);

        // Players join the game
        warlords::join_game(&player1, string::utf8(b"General Alpha"));
        warlords::join_game(&player2, string::utf8(b"General Beta"));

        // Check player states
        let (name1, army1, turns1) = warlords::get_player_state(signer::address_of(&player1));
        assert!(name1 == string::utf8(b"General Alpha"), 0);
        
        let (archers, cavalry, infantry) = warlords::get_army_details(&army1);
        assert!(archers == 500 && cavalry == 500 && infantry == 500, 1);
        assert!(warlords::get_army_strength(&army1) == 1500, 2);
        assert!(turns1 == 2, 3);

        // Player1 mobilizes their army
        warlords::mobilize(&player1, 600, 500, 400);

        // Simulate time passing
        timestamp::fast_forward_seconds(3601); // Move time forward by more than TICK_INTERVAL

        // Tick the game
        warlords::tick_tock();

        // Player2 mobilizes and attacks
        warlords::mobilize(&player2, 700, 600, 500);
        warlords::attack(&player2);

        // Check the castle state
        let (king, _, _) = warlords::get_castle_info();
        assert!(king == signer::address_of(&player2), 4); // Player2 should now be king

        // Continue the test with more interactions...
    }
}