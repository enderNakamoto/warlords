![alt text](images/cover.png)

## Introduction  

Shogun is a fully on-chain game that integrates the Acurast network, bringing real-world data on-chain in a decentralized and trust-minimized way. The core innovation of this project is leveraging Acurast's Trusted Execution Environment (TEE) to run Node.js scripts, making it an oracle for non-financial data, such as weather conditions. In our case, we retrieve weather data from the OpenWeather API with minimal trust assumptions. Additionally, Acurast processors act as decentralized keepers by running scheduled cron jobs.

Set in the Edo period of Japan, the goal of the game is to gain control of Edo Castle. Real-time weather conditions in Tokyo directly affect gameplay and strategy—rain stunts cavalry charges but empowers infantry, while clear skies provide an extra bonus to cavalry, enhancing their effectiveness in battle.

Here are the main actions a player can take:

* Join the Game
* Set Castle Defense (only the current Shogun, the lord of the castle edo, can do this)
* Attack Castle Edo 
* Mobilize Army (determine the composition of the attacking army)

The Scripts in Acurast Trusted Execution Environment (TEE) handles the following tasks:

* Update Weather Conditions (every three hours)
* Set Player Turns (for all registered players, every hour)

## Implementation details - Game rules

When a player joins the game, they start with 10 turns and a default attacking army of 500 archers, 500 cavalry, and 500 infantry. Players can mobilize and change their army composition at any time for a cost of 3 turns, with a maximum total army size of 2,000 units.

Players can attack Edo Castle (Tokyo) at the cost of 10 turns. The Acurast Keepers (cron jobs) ensure that players receive one turn every hour, with each turn representing one in-game day.

If a player wins the battle, they become the next Shogun of Tokyo, gaining the ability to set the defense of the castle (an army of up to 1,600 units). A player cannot attack themselves, and each successful attack earns 1 point. These points determine a player's rank on the leaderboard. Once a player wins the castle, they cannot be attacked for 2 turns, giving the player a chance to set custom defense.

The game resets every 365 turns, which equates to one in-game year (approximately 15 real-life days). At the end of each game year, the player with the most points on the leaderboard wins. The first and current year is named the "Year of the Satoshi Nakamoto".

## Game Architecture

The following diagram shows all the public entry functions and the oracle/keeper data flow: 

![alt text](images/architecture.png)

## Future Game Enhancements:

Sky is the limit when it comes to addition of game features. However, the main things to be added before a production launch is as follows: 

* Making the turns scarce, so people can only attack once every 2-3 days, and adding the ability for players to "buy" turns. 

* Aptos collected from players buying the turns will be distributed between the current Shogun, and the treasury in a 70/30 split. This will incentivize holding onto a castle

* cACU and APT tokens are needed for Acurast Processors to run the oracles and keepers. The treasury money will be allocated for that.

* Multiple Castles can be added, each with unique weather associated to it's location. For someone to be Shogun, they will have to be holding majority of the castles, instead of just 1. 


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
