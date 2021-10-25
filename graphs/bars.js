
async function bar_players_center(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let names = []
	let values = []

	for(let i=0;i<20;i++){
		values[i] = 0
		names[i] = (300*i) + "-" + (300*(i+1)) 
	}

	let total = 0

	for(match of data){
		for(player of match.players){
			total += 1
			values[Math.floor(distance(
				player.touchdown_position[0], 
				player.touchdown_position[0], 
				match.last_gas_center[0], 
				match.last_gas_center[1]
			) / 300)] += 1
		}
	}

	for(let i=0;i<20;i++) {
		values[i] *= 100 / total
	}

	var data = [
		{
			x: names,
			y: values,
			type: 'bar'
		}
	];

	Plotly.newPlot('bar1', data);
}


async function bar_gas_death_distance_center (data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let names = []
	let died_gas = []
	let died_total = []

	for(let i=0;i<20;i++){
		died_total[i] = 0
		died_gas[i] = 0
		names[i] = (300*i) + "-" + (300*(i+1)) 
	}


	for(match of data){
		for(player of match.players){
			let index = Math.floor(distance(
				player.touchdown_position[0], 
				player.touchdown_position[0], 
				match.last_gas_center[0], 
				match.last_gas_center[1]
			) / 300)
			
			died_total[index] += 1
			if (player.died_in_gas) {
				died_gas[index] += 1
			}
		}
	}

	let values = []
	for(let i=0;i<20;i++) {
		values[i] = 100 * died_gas[i] / died_total[i]
	}

	var data = [
		{
			x: names,
			y: values,
			type: 'bar'
		}
	];

	Plotly.newPlot('bar2', data);
}


async function bar_avg_rank_distance_center(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let names = []
	let died_rank = []
	let died_total = []

	for(let i=0;i<20;i++){
		died_total[i] = 0
		died_rank[i] = 0
		names[i] = (300*i) + "-" + (300*(i+1)) 
	}


	for(match of data){
		for(player of match.players){
			let index = Math.floor(distance(
				player.touchdown_position[0], 
				player.touchdown_position[0], 
				match.last_gas_center[0], 
				match.last_gas_center[1]
			) / 300)
			
			died_total[index] += 1
			died_rank[index] += player.ranking
		}
	}

	let values = []
	for(let i=0;i<20;i++) {
		values[i] = died_rank[i] / died_total[i]
	}

	var data = [
		{
			x: names,
			y: values,
			type: 'bar'
		}
	];

	Plotly.newPlot('bar3', data);
}
