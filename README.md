![alt text](images/cover.png)

## Game Links
- **Main Game GitHub Repository**: [https://github.com/enderNakamoto/warlords](https://github.com/enderNakamoto/warlords)
- **Website**: [https://warlords.vercel.app/](https://warlords.vercel.app/)
- **Testnet Address**: [https://explorer.aptoslabs.com/object/0xee1dada4f9bbce01099f0bf865475f3a273f63afb02e473005ef289ceed5c44c/modules/code/warlords?network=testnet](https://explorer.aptoslabs.com/object/0xee1dada4f9bbce01099f0bf865475f3a273f63afb02e473005ef289ceed5c44c/modules/code/warlords?network=testnet)
- **Acurast Weather Oracle Github Repository**: https://github.com/Cloakworks-collective/shogun-weather-oracle
- **Acurast Decentralized Keeper Github Repository**: https://github.com/Cloakworks-collective/shogun-keeper
- **Backup Cron Job Github Repository**: https://github.com/Cloakworks-collective/shogun_backup_cron

## Introduction

Set in the Edo period of Japan, the goal of *Shogun* is to seize control of Edo Castle. Real-time weather conditions in Tokyo (historically Edo) directly impact gameplay and strategy. For example, rain hinders cavalry charges but strengthens infantry, while clear skies provide a bonus to cavalry, enhancing their effectiveness in battle.

*Shogun* is a fully on-chain game on the Aptos L1, built using Move. The core innovations of this project include:

- **Leveraging Acurast**: We utilize [Acurast](https://docs.acurast.com) to run Node.js scripts, acting as an **oracle** for non-financial data, such as weather. Weather data is fetched from the OpenWeather API with minimal trust assumptions and influences the in-game battle mechanics. Tokyo's weather is updated every 6 hours.

- **Decentralized Keepers**: Acurast processors serve as decentralized **keepers**, executing scheduled cron jobs. In our game, player statuses are updated every hour. This mechanism can be extended to support other decentralized, turn-based games on Aptos.

- **Aptos Randomness API**: We incorporate the [Aptos randomness API](https://aptos.dev/en/build/smart-contracts/randomness) to add an element of chance to battles. Combined with weather dependency, this randomness creates a more dynamic, realistic, and enjoyable battle strategy experience.


## Game Architecture

The following diagram shows all the public entry functions and the oracle/keeper data flow: 

![alt text](images/architecture.png)

The Diagram above shows the user actions, and the automated actions of Acurast processors (cron jobs):

Main Actions a Player Can Take (public entry functions called by players) are as follows:

- **Join the Game**: Upon joining the game, a player's default values are initialized in the game state. Players are provided with an army that has a default troop composition.
  
- **Mobilize Army**: After joining the game, players can modify the composition of their attacking army.

- **Attack Castle Edo**: Players can challenge Edo Castle. If they succeed, they become the next Shogun.

- **Set Castle Defense**: Only the current Shogun, the lord of Edo Castle, has the authority to change the troop composition of the defending army.

The scripts running in Acurast’s TEE handle the following automated tasks (public entry functions called by cron jobs):

- **Update Weather Conditions**: Fetches and updates the weather data every 6 hours.
  
- **Update Player State**: Updates player statuses every hour.

## Acurast Integration (Oracle and Keeper) and trust assumptions:

Acurast is a decentralized and trustless compute execution layer, leveraging Trust Execution Environments opening up the capability to have Acurast’s Processors (off-chain workers) fetch, sign and submit data on-chain completely trustless and confidential. The processors are highly decentralized and uses processing power of old mobile phones. 

On Aptos, fetching non-price feed data can be difficult. However, we believe that Aptos smart contracts can receive Web2 API data through Acurast TEE processors with minimal trust assumptions. As a result, we decided to run scripts containing the [aptos-ts-sdk](https://github.com/aptos-labs/aptos-ts-sdk) inside Acurast processors.

For our proof of concept, we deployed nodejs script on a Acurast processor that fetches weather data from [openweathermap api](https://openweathermap.org/current). Assuming that the data from Openweather API is correct, the data is forwarded to the game smart contract (move module) without additional trust overhead. It is signed by a preassigned weatherman, verifying that the incoming data comes from the acurast processor. 

The acurast data sets the weather condition to one of the following options, based on the [weather condition codes of the api](https://openweathermap.org/weather-conditions)

```rust
    const CLEAR: u8 = 0;
    const CLOUDS: u8 = 1;
    const SNOW: u8 = 2;
    const RAIN: u8 = 3;
    const DRIZZLE: u8 = 4;
    const THUNDERSTORM: u8 = 5;
```
Each weather condition affects the effectiveness of the units, adding a layer of strategy to the game. 

Moreover, we also use a second script to call `tick_tock()` function of the module to update player states every turn. This is a proof of concept use of Acurast processors as ** decentralized keepers**. This function is not gated (anyone call this), however there is an internal check that only affects the game state if it is called after 1 hr has passed.

Note: You can find out more on Acurast's trust minimized processing [here](https://docs.acurast.com/acurast-protocol/architecture/end-to-end/)

Acurast processor clusters are highly decentralized and permissionless, allowing anyone to join and contribute, making the network more resilient and distributed. The picture below showcases various processor clusters. The one on the left represents our cluster, where our proof-of-concept scripts are currently running. In production, we plan to deploy to a randomly selected processor within the Acurast ecosystem (ones that we do not own), with multiple redundancies to further minimize trust assumptions and enhance reliability.

![alt text](images/acurast_cluster.png)

## Implementation details - Game rules

When a player joins the game, they start with 10 turns and a default attacking army consisting of 500 archers, 500 cavalry, and 500 infantry. Players can mobilize and modify their army composition at any time for a cost of 3 turns, with a maximum army size of 2,000 units.

Attacking Edo Castle (Tokyo) costs 10 turns. Acurast Keepers (cron jobs) ensure that players receive 1 turn every hour, with each turn representing one in-game day.

If a player wins the battle, they become the next Shogun of Tokyo, gaining the ability to set the castle's defense with an army of up to 1,600 units. Players cannot attack themselves, and each successful attack earns 1 point, which contributes to their rank on the leaderboard.

To maintain fairness, we use the Aptos Randomness API, which gives defenders a 60% chance of winning battles. Therefore, attackers must carefully consider weather conditions and their troop composition to increase their chances of success.

```rust
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
```

The current Shogun can also continually adjust their defending army composition to strengthen their hold on the castle and prolong their reign.

## Test Coverage 

Our smart contract (Warlord Module) has comprehensive test coverage. We have implemented unit tests for all public entry functions, ensuring that key aspects of the game function as intended. To simulate different outcomes, we mock the randomness API to test various conditions where either the attacker or defender wins. Additionally, we mock weather conditions to thoroughly test how battles play out under different weather scenarios.

![alt text](images/test_coverage.png)

## Future Game Enhancements

The possibilities for adding new features are endless, but the key enhancements we plan to implement before a full production launch include:

- **Turn Scarcity and Purchasable Turns**: Players will only be able to attack once every 1-2 days, introducing scarcity to the game. Additionally, players will have the ability to "buy" extra turns.

- **Incentivized Attacks and Defenses**: Aptos collected from players buying turns will be distributed between the current Shogun and the treasury in a 70/30 split. This system will incentivize both attacking the castle and defending the Shogun position. Players will be encouraged to attack and hold the position of Shogun (pay-to-hold), earning rewards in the process.

- **Funding Acurast Processors**: The cACU and APT tokens are required for Acurast Processors to run the oracles and keepers. A portion of the treasury funds will be allocated to cover these operational costs.

- **Multiple Castles with Unique Weather**: We plan to add multiple castles to the game, each with weather conditions tied to its specific location. To become the Shogun, a player must hold a majority of the castles, rather than just one, adding new layers of strategy.

We plan to apply for the Aptos developer grant to help launch this game into production.

## Quick Start (Localhost)
- Download the project
- cd into project's folder
- Create .env file by example and fill required values (NEXT_PUBLIC_MODULE_ADDRESS is not required)
- Run:
```
npm install
npm run move:publish
npm run dev
```
We used the [Aptos boilerplate](https://aptos.dev/en/build/create-aptos-dapp/templates/boilerplate) as the starting point for our project

## Available commands

- `npm run move:publish` - a command to publish the Move contract
- `npm run dev` - a command to start localhost 
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run deploy` - a command to deploy the dapp to Vercel