
const DISTANCEGROUPS = 20
const DISTANCEWIDTH = 300

async function bar_players_center(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let names = []
	let values = []

	for(let i=0;i<DISTANCEGROUPS;i++){
		values[i] = 0
		names[i] = (DISTANCEWIDTH*i) + "-" + (DISTANCEWIDTH*(i+1)) 
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
			) / DISTANCEWIDTH)] += 1
		}
	}

	for(let i=0;i<DISTANCEGROUPS;i++) {
		values[i] *= 100 / total
	}

	let traces = [
		{
			x: names,
			y: values,
			type: 'bar',
			marker: {color: '#0088CC'},
		}
	];

	Plotly.newPlot('bar1', traces, {
        title: 'PLAYER % DISTANCE TO GAS CENTER DISTRIBUTION',
    });
}


async function bar_gas_death_distance_center (data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let names = []
	let died_gas = []
	let died_total = []

	for(let i=0;i<DISTANCEGROUPS;i++){
		died_total[i] = 0
		died_gas[i] = 0
		names[i] = (DISTANCEWIDTH*i) + "-" + (DISTANCEWIDTH*(i+1)) 
	}


	for(match of data){
		for(player of match.players){
			let index = Math.floor(distance(
				player.touchdown_position[0], 
				player.touchdown_position[0], 
				match.last_gas_center[0], 
				match.last_gas_center[1]
			) / DISTANCEWIDTH)
			
			died_total[index] += 1
			if (player.died_in_gas) {
				died_gas[index] += 1
			}
		}
	}

	let values = []
	for(let i=0;i<DISTANCEGROUPS;i++) {
		values[i] = 100 * died_gas[i] / died_total[i]
	}

	let traces = [
		{
			x: names,
			y: values,
			type: 'bar',
			marker: {color: '#448844'},
		}
	];

	Plotly.newPlot('bar2', traces, {
        title: 'GAS DEATH % VS DISTANCE TO GAS CENTER',
    });
}


async function bar_avg_rank_distance_center(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let names = []
	let died_rank = []
	let died_total = []

	for(let i=0;i<DISTANCEGROUPS;i++){
		died_total[i] = 0
		died_rank[i] = 0
		names[i] = (DISTANCEWIDTH*i) + "-" + (DISTANCEWIDTH*(i+1)) 
	}


	for(match of data){
		for(player of match.players){
			let index = Math.floor(distance(
				player.touchdown_position[0], 
				player.touchdown_position[0], 
				match.last_gas_center[0], 
				match.last_gas_center[1]
			) / DISTANCEWIDTH)
			
			died_total[index] += 1
			died_rank[index] += player.ranking
		}
	}

	let values = []
	for(let i=0;i<DISTANCEGROUPS;i++) {
		values[i] = died_rank[i] / died_total[i]
	}

	let traces = [
		{
			x: names,
			y: values,
			type: 'bar',
			marker: {color: '#FF4444'},
		}
	];

	Plotly.newPlot('bar3', traces, {
        title: 'AVERAGE RANK VS DISTANCE TO GAS CENTER',
    });
}
