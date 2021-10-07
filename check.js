/*
check.js verify() loops through all the data inputed and will output what errors are found in the data collected.

There are two types errors, that are classified as errors and outliers. 

Errors are certainly wrong and will skew data but occasionally happen just do to the nature of the data collection process, 
while outliers are less certain and might be wrong but need to be validated manually as they could be legitimate data being flagged.

The two types will output different names an ERROR_NAME made of capital letters, while outliers will have a lower case outlier_name.

Errors will always be printed but outliers can be disabled by setting the flag below to false.
*/

const OUTLIER_CHECK = true

function verify(data){
	function not_in_range(value, min, max){
		if(min > value || max < value) return true
		else return false
	}
	function get_ver(match){
		if(match.version == undefined) return 1
		else return match.version
	}

	for(match of data){
		const version = get_ver(match)
		console.log("v" + version + " " + match.name) //TODO: if version > 1 add check for if its sorted by rank and correctly by death time

		//Time checks
		if(not_in_range(match.start_time, 1630000000.0, 1640000000.0)) 
			console.log("START_TIME " + match.start_time)
		if(not_in_range(match.end_time, 1630000000.0, 1640000000.0)) 
			console.log("END_TIME " + match.end_time)
		
		//Data collection check
		if(!(match.game_started && match.game_ended)) 
			console.log("PHASE " + match.game_started + " " + match.game_ended)
		
		//Position in world checks
		if(not_in_range(match.flight_start[0], 0.0, 5000.0) || not_in_range(match.flight_start[1], 0.0, 5000.0)) 
			console.log("FLIGHT_START " + match.flight_start[0] + " " + match.flight_start[1]) 
		if(not_in_range(match.flight_end[0], 0.0, 5000.0) || not_in_range(match.flight_end[1], 0.0, 5000.0))
			console.log("FLIGHT_END " + match.flight_end[0] + " " + match.flight_end[1])
		if(not_in_range(match.last_gas_center[0], 0.0, 5000.0) || not_in_range(match.last_gas_center[1], 0.0, 5000.0))
			console.log("GAS_CENTER " + match.last_gas_center[0] + " " + match.last_gas_center[1])

		if(OUTLIER_CHECK){
			if(not_in_range((match.flight_end - match.flight_start), 300.0, 420.0))
				console.log("match_length " + (match.flight_end - match.flight_start))	
		}


		//Initialize player checks
		let duplicate_ranks = []
		for(let i=0; i<64; i++)
			duplicate_ranks[i] = -1

		for(let p = 0; p < match.players.length; p++){
			let player = match.players[p]

			//duplicate rank check
			if(duplicate_ranks[player.ranking-1] != -1){
				console.log("RANK[" + p + "] " + player.ranking + " conflict["+duplicate_ranks[player.ranking-1]+"]")
			} else duplicate_ranks[player.ranking-1] = p
				
			//time checks
			if(not_in_range(player.jump_time, 1630000000.0, 1640000000.0) ||
				not_in_range(player.jump_time, match.start_time, match.end_time))
				console.log("JUMP_TIME[" + p + "] " + player.jump_time)
			if(not_in_range(player.touchdown_time, 1630000000.0, 1640000000.0) ||
				not_in_range(player.touchdown_time, match.start_time, match.end_time))
				console.log("TOUCHDOWN_TIME[" + p + "] " + player.touchdown_time)
			if(player.ranking != 1)  //winner cant die check
				if(not_in_range(player.death_time, 1630000000.0, 1640000000.0) ||
					not_in_range(player.death_time, match.start_time, match.end_time))
					console.log("DEATH_TIME[" + p + "] " + player.death_time)
			
			//order check (for v2)
			if(version > 1){
				if(player.ranking == p-1)
					console.log("RANK_INDEX[" + p + "] " + player.ranking)
				if(p != 0 && p != 1) {
					let prev_player = match.players[p - 1]
					if(player.death_time - prev_player.death_time > 0.0){
						console.log("RANK_ORDER_PREV[" + p + "] " + (p-1))
					}
				}
				if(p != match.players.length - 1 && p != 0){
					let next_player = match.players[p + 1]
					if(next_player.death_time - player.death_time > 0.0) {
						console.log("RANK_ORDER_NEXT[" + p + "] " + (p+1))
					}
				}
			}
			
			//world valid position checks
			if(not_in_range(player.jump_position[0], 0.0, 5000.0) || not_in_range(player.jump_position[1], 0.0, 5000.0)) 
				console.log("JUMP_POS[" + p + "] " + player.jump_position[0] + " " + player.jump_position[1])
			if(not_in_range(player.touchdown_position[0], 0.0, 5000.0) || not_in_range(player.touchdown_position[1], 0.0, 5000.0)) 
				console.log("LAND_POS[" + p + "] " + player.touchdown_position[0] + " " + player.touchdown_position[1])
			if(player.ranking != 1)	
				if(not_in_range(player.death_position[0], 0.0, 5000.0) || not_in_range(player.death_position[1], 0.0, 5000.0)) 
					console.log("DEAD_POS[" + p + "] " + player.death_position[0] + " " + player.death_position[1])
		
			if(OUTLIER_CHECK){
				if(not_in_range((player.jump_time - match.start_time), 2.0, 90.0))
					console.log("jump_time[" + p + "] "+ (player.jump_time - match.start_time))
				if(not_in_range((player.touchdown_time - match.start_time), 5.0, 120.0))
					console.log("land_time[" + p + "] "+ (player.touchdown_time - match.start_time))
			}
		}
	}
}