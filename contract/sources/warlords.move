module warlords_addr::warlords {

    // ================================= Imports ================================= //

    // ================================= Errors ================================= //

    // ================================= Constants ============================== //

    // ================================= State/Structs/Enums ================================== //

    // ================================= Events ================================== //

    // ================================= Module Init ================================== //
    fun init_module(sender: &signer) {

    }

    // ======================== Write functions ========================

    public entry fun join_game() {

    }

    public entry fun mobilize() {

    }

    public entry fun attack() {

    }

    public entry fun defend() {

    }

    public entry fun get_turns() {

    }

    public entry fun set_weather() {

    }

    public entry fun tick_tock() {

    }

    // ======================== Read Functions ========================

    #[view]
    public fun get_castle_info() {
    }

    #[view]
    public fun get_player_state() {
    }

    #[view]
    public fun get_last_tick_timestamp() {
    }

    #[view]
    public fun get_weatherman() {
    }

    // ======================== Helper functions ========================

    fun calculate_army_strength() {
    }

    fun calculate_army_cost() {
    }

    // ======================== Unit Tests ========================

    #[test_only]
    public fun init_module_for_test(sender: &signer) {
        init_module(sender);
    }
}
