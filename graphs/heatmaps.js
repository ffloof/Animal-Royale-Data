
const WORLDSIZE = 4650
const SECTORS = 50

async function heatmap_gas_death(data){
	let player_drops = []
	let gas_deaths = []

	for(y=0;y<SECTORS;y++){
		player_drops[y] = []
		gas_deaths[y] = []
		for(x=0;x<SECTORS;x++){
			player_drops[y][x] = 0
			gas_deaths[y][x] = 0
		}
	}

	for(match of data){
		for(player of match.players){
			let x = Math.floor(player.touchdown_position[0] * SECTORS / WORLDSIZE)
			let y = Math.floor(player.touchdown_position[1] * SECTORS / WORLDSIZE)
			player_drops[y][x] += 1
			if(player.died_in_gas) gas_deaths[y][x] += 1 
		}
	}

	for(y=0;y<SECTORS;y++){
		for(x=0;x<SECTORS;x++){
			if(player_drops[y][x] == 0) gas_deaths[y][x] = 0
			else gas_deaths[y][x] *= 100 / player_drops[y][x]
		}
	}
		
	let traces = [
		{
			z:gas_deaths,
			type:'heatmap'
		}
	]

	Plotly.newPlot('heatmap1', traces, {
	    title: 'GAS DEATH % BY DROP LOCATION',
	})
}

async function heatmap_avg_rank(data){
	let player_drops = []
	let avg_rank = []

	for(y=0;y<SECTORS;y++){
		player_drops[y] = []
		avg_rank[y] = []
		for(x=0;x<SECTORS;x++){
			player_drops[y][x] = 0
			avg_rank[y][x] = 0
		}
	}

	for(match of data){
		for(player of match.players){
			let x = Math.floor(player.touchdown_position[0] * SECTORS / WORLDSIZE)
			let y = Math.floor(player.touchdown_position[1] * SECTORS / WORLDSIZE)
			player_drops[y][x] += 1
			avg_rank[y][x] += player.ranking 
		}
	}

	for(y=0;y<SECTORS;y++){
		for(x=0;x<SECTORS;x++){
			if(player_drops[y][x] == 0) avg_rank[y][x] = 64
			else avg_rank[y][x] /= player_drops[y][x]
		}
	}
		
	let traces = [
		{
			z:avg_rank,
			type:'heatmap'
		}
	]

	Plotly.newPlot('heatmap2', traces, {
	    title: 'AVERAGE RANK BY DROP LOCATION',
	})
}