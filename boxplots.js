async function boxplot_time_jumped_by_rank(data){
	let arr_jump_times = []

	for(let i=1;i<64;i++){
		arr_jump_times.push([])
	}

	for(match of data){
		for(player of match.players){
			arr_jump_times[player.ranking - 1].push(player.jump_time - match.start_time)
		}
	}

	let traces = []

	for(let i=0;i<arr_jump_times.length;i++){
		traces.push({
	        type: 'box',
	        y: arr_jump_times[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot1', traces, {
	    title: 'TIME OF JUMP BY RANK',
	    showlegend: false
	});
}

async function boxplot_time_landed_by_rank(data){
	let arr_land_times = []

	for(let i=1;i<64;i++){
		arr_land_times.push([])
	}

	for(match of data){
		for(player of match.players){
			arr_land_times[player.ranking - 1].push(player.touchdown_time - match.start_time)
		}
	}

	let traces = []

	for(let i=0;i<arr_land_times.length;i++){
		traces.push({
	        type: 'box',
	        y: arr_land_times[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot2', traces, {
	    title: 'TIME OF LANDING BY RANK',
	    showlegend: false
	});
}

async function boxplot_time_parachuting_by_rank(data){
	let arr_parachute_times = []

	for(let i=1;i<64;i++){
		arr_parachute_times.push([])
	}

	for(match of data){
		for(player of match.players){
			arr_parachute_times[player.ranking - 1].push(player.touchdown_time - player.jump_time)
		}
	}

	let traces = []

	for(let i=0;i<arr_parachute_times.length;i++){
		traces.push({
	        type: 'box',
	        whiskerwidth: 0.0,
	        y: arr_parachute_times[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot3', traces, {
	    title: 'TIME PARACHUTING BY RANK',
	    showlegend: false
	});
}

async function boxplot_time_death_by_rank(data){
	let arr_death_times = []

	for(let i=1;i<64;i++){
		arr_death_times.push([])
	}

	for(match of data){
		for(player of match.players){
			if(player.ranking != 1) arr_death_times[player.ranking - 1].push(player.death_time - match.start_time)
			else arr_death_times[player.ranking - 1].push(match.end_time - match.start_time)
		}
	}

	let traces = []

	for(let i=0;i<arr_death_times.length;i++){
		traces.push({
	        type: 'box',
	        y: arr_death_times[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot4', traces, {
	    title: 'TIME DEAD BY RANK',
	    showlegend: false
	});
}