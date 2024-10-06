![alt text](images/cover.png)

## Introduction  

Shogun is a fully on-chain game on Aptos L1 written in Move. The core innovation of this project is leveraging [Acurast](https://docs.acurast.com) to run Node.js scripts, making it an oracle for non-financial data, such as weather conditions. In our case, we retrieve weather data from the OpenWeather API with minimal trust assumptions that affects the in-game battle mechanics. Additionally, Acurast processors act as decentralized keepers by running scheduled cron jobs.

Set in the Edo period of Japan, the goal of the game is to gain control of Edo Castle. Real-time weather conditions in Tokyo(Edo) directly affect gameplay and strategy, e.g. rain stunts cavalry charges but empowers infantry, while clear skies provide an extra bonus to cavalry, enhancing their effectiveness in battle.

Here are the main actions a player can take:

* Join the Game
* Set Castle Defense (only the current Shogun, the lord of the castle edo, can do this)
* Attack Castle Edo 
* Mobilize Army (determine the composition of the attacking army)

The Scripts in Acurast Trusted Execution Environment (TEE) handles the following tasks:

* Update Weather Conditions (every 6 hours)
* Set Player Turns (for all registered players, every hour)

## Quick Start 

- Download the project

- cd into project's folder

- Create .env file by example and fill required values (NEXT_PUBLIC_MODULE_ADDRESS is not required)

- Run:

```

npm install

npm run move:publish

npm run dev

```

Boilerplate info: https://aptos.dev/en/build/create-aptos-dapp/templates/boilerplate

## Game Architecture

The following diagram shows all the public entry functions and the oracle/keeper data flow: 

![alt text](images/architecture.png)

## Acurast Integration and trust assumptions

Acurast is a decentralized and trustless compute execution layer, leveraging Trust Execution Environments opening up the capability to have Acurast’s Processors (off-chain workers) fetch, sign and submit data on-chain completely trustless and confidential. The processors are highly decentralized and uses processing power of old mobile phones. 

For our proof of concept, deployed nodejs script on a Acurast processor fetches that weather data from [openweathermap api](https://openweathermap.org/current). Assuming that the data from Openweather API is correct, the data is forwarded to the game smart contract (move module) without additional trust overhead. It is signed by a preassigned weatherman, verifying that the incoming data comes from the acurast processor. 

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

Moreover, we also use a second script to call `tick_tock()` function of the module to update player states every turn. This is a proof of concept use of Acurast processors as keepers. This function is not gated (anyone call this), however there is an internal check that only affects the game state if it is called after 1 hr has passed. In the future, we can offer a small bounty for bots to call this every hour -- turning it into a robust decentralized keeper.

Note: You can find out more on Acurast's trust minimized processing [here](https://docs.acurast.com/acurast-protocol/architecture/end-to-end/)

## Implementation details - Game rules

When a player joins the game, they start with 10 turns and a default attacking army of 500 archers, 500 cavalry, and 500 infantry. Players can mobilize and change their army composition at any time for a cost of 3 turns, with a maximum total army size of 2,000 units.

Players can attack Edo Castle (Tokyo) at the cost of 10 turns. The Acurast Keepers (cron jobs) ensure that players receive one turn every hour, with each turn representing one in-game day.

If a player wins the battle, they become the next Shogun of Tokyo, gaining the ability to set the defense of the castle (an army of up to 1,600 units). A player cannot attack themselves, and each successful attack earns 1 point. These points determine a player's rank on the leaderboard. Once a player wins the castle, they cannot be attacked for 2 turns, giving the player a chance to set custom defense.

The game resets every 365 turns, which equates to one in-game year (approximately 15 real-life days). At the end of each game year, the player with the most points on the leaderboard wins. The next age ( game year) is named after the last age's winner. The first and current year is named - "Era of Satoshi Nakamoto".


## Future Game Enhancements:

Sky is the limit when it comes to addition of game features. However, the main things to be added before a production launch is as follows: 

* Making the turns scarce, so people can only attack once every 1-2 days, and adding the ability for players to "buy" turns. 

* Aptos collected from players buying the turns will be distributed between the current Shogun, and the treasury in a 70/30 split. This will incentivize attacking and defending a castle. 

* cACU and APT tokens are needed for Acurast Processors to run the oracles and keepers. The treasury money will be allocated for that.

* Multiple Castles can be added, each with unique weather associated to it's location. For someone to be Shogun, they will have to be holding majority of the castles, instead of just one.

## Tools used

- NextJs
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Move Smart contracts 
- Acurast TEE Oracles (Nodejs Scripts running in Acurat processors)

## Available commands

- `npm run move:publish` - a command to publish the Move contract
- `npm run dev` - a command to start localhost 
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run deploy` - a command to deploy the dapp to Vercel


## Progress

| Feature | Started | Basic | Completed |
| :--------- | :------ | :-----  | :----- |
| Init | [x] | [x] | [] |
| Join | [x] | [x] | [] |
| Mobilize | [x] | [x] | [] |
| Attack | [x] | [x] | [] |
| Defend | [x] | [x] | [] |
| Set Weather | [x] | [] | [] |
| Tick | [x] | [] | [] |
| Get Player State | [x] | [x] | [] |
| Get Castle State | [x] | [x] | [] |
| Get Tick State | [x] | [x] | [] |
| Named Object For Storage | [] | [] | [] |
| Simple Battle | [x] | [] | [] |
| Randomness Battle | [x] | [] | [] |
| Complicated Battle | [] | [] | [] |

