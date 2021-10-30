# Super Animal Royale Data

//TODO: Include Sar Banner Image

## Table of Contents 
1. [Introduction](#introduction)
2. [Data Collection](#data-collection)
3. [Data Sanitation](#data-sanitation)
4. [Theories and Findings](#theories-and-findings)
5. [Conclusion](#conclusion)
6. [Calendar](#calendar)
7. [How To Use](#how-to-use)

## Introduction


I wanted to study player behavior in a battle royale style game that pits many players against each other and tries to see who will be the last survivor among them. I wrote a program that automatically joined games and watched them recording player data. After running it for the past few weeks I amassed a considerable amount of data from over 500+ games. 

<img src="./docs/densitymapcrop.png" width="400" height="400"/> <img src="./docs/gamemap.png" width="400" height="400"/>

## Data Collection

Data collection was handled by two programs one that collected the data by reading values straight from the games memory, while the other would automatically join games and avoid getting kicked for inactivity while trying to have a minimal impact on the other players. Each games data gets stored into a json file which has the following fields.

```javascript
"version": uint, //version field was added in v2
"start_time": float, //All times are stored in seconds since unix epoch
"end_time": float,
"flight_start": [float,float], //All positions are stored as a pair [x,y]
"flight_end": [float,float],
"last_gas_center": [float,float],
"last_gas_radius": float,
"players": Player[63], //Array of other players in match
"local_player_info": Player //In v1 this didn't exist and the player was simply filtered out

Player {	
	"ranking": uint,
	"jump_position": [float, float],
	"jump_time": float,
	"touchdown_position": [float, float],
	"touchdown_time": float,
	"death_position": [float, float],
	"death_time": float
	"died_in_gas": bool, //Bug in v1, since before gas spawned radius = 0, so every player who died was considered to have died to gas, fixed in v2

	//Used when data gathering, not relevant for analysis
	"last_in_flight": bool,
	"last_is_parachuting": bool,
	"last_is_dead": bool
	"local_player": bool, 
    
}

//Also used when data gathering, not relevant for analysis
"game_started": bool, 
"game_ended": bool,
```
* Note: v1 and v3 data had bugs, data analyzed was mostly v2, with some select v3 data.

## Data Sanitation

Due to the nature of how memory is deallocated after each game, and how the game engine handles player data, occasionally data was misrecorded, or recorded null bytes. As a result `check.js` is used to screen all the data, in an attempt to verify its validity. It logs the name and date of each file being analyzed and below will log any errors in the data.

![](docs/console.png?raw=true)

It does various checks like verifying the order of deaths, making sure theyre within the span of the game, checking player positions to ensure they're valid and other miscallaneous checks. Through this I was able to weed out any contaminated data sets. I've seperated the data into three sets.

- `./data/clean/*` All the data(v2 and v3) that I am using in my analysis
- `./data/dirty/*` All the data that was filtered out because it set off various flags while being verified
- `./data/v1/*` Unfiltered v1 data which has a known bug relating to died_in_gas 

## Theories and Findings

I didn't go into this project with any particular hypothesis to test. I just wanted to analyze the data and try to make observations and reason out why it turned out how it turned out.

### Gas deaths

<img src="./docs/bar1.png" width="400" height="400"/> <img src="./docs/bar2.png" width="400" height="400"/>

Players tend to disperse a fair distance away from the final gas circle with 90% dropping at least 1000 units away from the final gas circle center. The area the player can land on the map including ocean being about 4600 x 4600 units. From corner to corner this is about 6500 units however since the gas ring's center always has to be on land in practice the furtherest a recorded player dropped was about 5400 units away from the gas.

![](docs/gamemapscale.png?raw=true)

The chance to die in the gas increases with the distance a player lands from the center. You could attribute this to the longer distance making it harder to escape the gas. However, in practice the percentage of deaths is likely inflated by inactive players. Inactive players automatically drop when the flight reaches the edge of the world and as a result they will often be far from the gas center, and since they are inactive they will die to the gas when it reaches them. In an average game less than 5% of players die while in the gas, which out of the 64 total, is around 3-4 players.

This could mean the gas isn't a huge threat but it could also mean that players have learned to avoid it. Either way only about 5% of players died while in the gas which is far less than I initially expected. It makes sense since you can almost always outrun the gas while rolling with the sword out and during the first few rings it does very little damage, and you can easily out heal it.

<img src="./docs/boxplot7.png" width="400" height="300"/> <img src="./docs/line2.png" width="400" height="300"/>

How far away a player drops appears to have little influence on the final ranking. The only exception are the people who died first, who tend to be the people who dropped earlier and closer to the edge of the island near the start of the game and as a result are further away on average but not by much. 

The percentage of players who die to gas increases greatly as the game goes on. This makes sense as many players die before the first ring appears. Even inactive players in a remote region of the map can survive for a considerable amount of time. And since the gas deals more damage with every consecutive ring it makes sense that it would be much more dangerous later on as players are fighting for a very limited amount of space.

NOTE: gas deaths are counted if the player happened to be standing in the gas when they died, they need not have died from the gas itself.

### Drop times

<img src="./docs/boxplot2.png" width="400" height="300"/> <img src="./docs/boxplot1.png" width="400" height="300"/> 

To little surprise every rank has a wide distribution of when people choose to jump and when they subsequently land. The only definitive trends are towards the lower and higher ranks. The lower ranks are the players who died the earliest in the game, and were the ones who got into fights first, so they must have landed sooner than most, and the data confirms. In the middling ranks the times plateau until reaching the last few ranks where players jump slightly sooner. This is pure speculation but I'd expect this is a result of higher ranking players being more experienced and less hesitant when choosing a place to land. The data also shows a clear maximum and minimum amount of time that can be spent dropping which is a good sign for the integrity of the data.

<img src="./docs/line1.png" width="400" height="300"/> <img src="./docs/boxplot3.png" width="400" height="300"/>

An average player drops around 21 seconds after the match starts, and lands 33 seconds after the match starts. Though the lowest ranking players who jump early on in the match bring down this average considerably. The game also has a mechanic where you can fall faster to reach the ground before other players. As expected it follows a similar trend with the lowest ranking players typically dropping the fastest and spending the least time in the air.

### Distances travelled

<img src="./docs/boxplot5.png" width="400" height="300"/> <img src="./docs/boxplot6.png" width="400" height="300"/> 

The distance travelled increases consistently with the ranking of the player. This makes sense as players who survive longer will travel further and further as the gas pushes them to another part of the map. Velocity on the other hand tells a much more interesting story. It reflects how the game plays out for different groups of players, the lowest ranking players die quickly and don't tend to travel very far, instead getting into a fight early on. Middle ranking players tend to travel a lot further as a result of the gas pushing them often far across the map. And as the rings get smaller less travelling is required and it becomes more a competition of holding on to the limited space left instead of travelling across the map meaning the highest ranking players will move slower on average, as the game becomes more and more about defending territory. 

NOTE: The distance travelled is calculated as a straight line from their landing point to their death point.

<img src="./docs/boxplot8.png" width="400" height="300"/> <img src="./docs/bar3.png" width="300" height="300"/>


 

### Deaths

<img src="./docs/line3.png" width="400" height="300"/> <img src="./docs/boxplot4.png" width="400" height="300"/>

### Density Distributions

![](docs/densitymap1.png?raw=true)
![](docs/densitymap2.png?raw=true)
![](docs/densitymap3.png?raw=true)
![](docs/densitymap5.png?raw=true)

### Rank determinism

<img src="./docs/densitymap4.png" width="400" height="400"/><img src="./docs/heatmap2.png" width="400" height="400"/>

## Conclusion




## Calendar

Calendar of when game data was recorded

**October**
|Mon|Tue|Wed|Thu|Fri|Sat|Sun|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|-|-|-|-|1 - **0**|2 - **0**|3 - **48**|
|4 - **95**|5 - **96**|6 - **67**|7 - **40**|8 - **33**|9 - **85**|10 - **13**|
|11 - **134**|12 - **0**|13 - **54**|14 - **0**|15 - **60**|16 - **0**|17 - **0**|
|18 - **0**|19 - **0**|20 - **0**|21 - **0**|22 - **0**|23 - **0**|24 - **0**|
|25 - **0**|26 - **0**|27 - **0**|28 - **0**|29 - **0**|30 - **0**|31 - **0**|

134 + 85 + 33 + 67 + 96 + 48 + 54 + 13 + 40 + 95 + 60
= 725 games of data

## How To Use

Download the repository and open index.html in your browser. Select the json files (shift click on two , highlight multiple files, or select all with CTRL + A) of the games you want to analyze and it'll output all the plots for you.