# Super Animal Royale Data

//TODO: Include Sar Banner Image

### Table of Contents 
1. [Introduction](#introduction)
2. [Data Collection](#data-collection)
3. [Data Sanitation](#data-sanitation)
4. [Theories and Findings](#theories-and-findings)
5. [Conclusion](#conclusion)
6. [Calendar](#calendar)
7. [How To Use](#how-to-use)

### Introduction

![Landing spot density plot](docs/densitymap1.png?raw=true)

I wanted to study player behavior in a battle royale style game that pits many players against each other and tries to see who will be the last survivor among them. I wrote a program that automatically joined games and watched them recording player data. After running it for the past few weeks I amassed a considerable amount of data from over 500+ games. 

### Data Collection

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

### Data Sanitation

Due to the nature of how memory is deallocated after each game, and how the game engine handles player data, occasionally data was misrecorded, or recorded null bytes. As a result `check.js` is used to screen all the data, in an attempt to verify its validity. It logs the name and date of each file being analyzed and below will log any errors in the data.

//TODO: add screenshot of console log output

It does various checks like verifying the order of deaths, making sure theyre within the span of the game, checking player positions to ensure they're valid and other miscallaneous checks. Through this I was able to weed out any contaminated data sets. I've seperated the data into three sets.

- `./data/clean/*` All the data(v2 and v3) that I am using in my analysis
- `./data/dirty/*` All the data that was filtered out because it set off various flags while being verified
- `./data/v1/*` Unfiltered v1 data which has a known bug relating to died_in_gas 

### Theories and Findings

### Conclusion




### Calendar

Calendar of when game data was recorded

**October**
|Mon|Tue|Wed|Thu|Fri|Sat|Sun|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|-|-|-|-|1 - 0|2 - 0|3 - 47|
|4 - 94|5 - 95|6 - 66|7 - 39|8 - 32|9 - 84|10 - 12|
|11 - 133|12 - 0|13 - 53|14 - 0|15 - 59|16 - 0|17 - 0|
|18 - 0|19 - 0|20 - 0|21 - 0|22 - 0|23 - 0|24 - 0|
|25 - 0|26 - 0|27 - 0|28 - 0|29 - 0|30 - 0|31 - 0|

133 + 84 + 32 + 66 + 95 + 47 + 53 + 12 + 39 + 94 + 59
= 714

Something is weird with the math there should be 725 total, not sure what the issue is.

### How To Use

Download the repository and open index.html in your browser. Select the json files (shift click on two or highlight multiple files) of the games you want to analyze and it'll output all the plots for you.