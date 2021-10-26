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
	        marker: {color:'hsl('+ i/4+'%,75%'+',50%)'},
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
	        marker: {color:'hsl('+ (i/3+45)+'%,65%'+',50%)'},
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
	        marker: {color:'hsl('+ (i/2+60)+'%,65%'+',50%)'},
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
	        marker: {color:'hsl('+ i+'%,65%'+',50%)'},
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

async function boxplot_distance_to_death_by_rank(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let arr_distances = []

	for(let i=1;i<64;i++){
		arr_distances.push([])
	}

	for(match of data){
		for(player of match.players){
			if(player.ranking != 1) 
				arr_distances[player.ranking - 1].push(distance(
				player.death_position[0], 
				player.death_position[1], 
				player.touchdown_position[0], 
				player.touchdown_position[1]
			))
			else arr_distances[player.ranking - 1].push(distance(
				match.last_gas_center[0], 
				match.last_gas_center[1], 
				player.touchdown_position[0], 
				player.touchdown_position[1]
			))
		}
	}

	let traces = []

	for(let i=0;i<arr_distances.length;i++){
		traces.push({
	        type: 'box',
	        marker: {color:'hsl('+ i/4+'%,75%'+',50%)'},
	        y: arr_distances[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot5', traces, {
	    title: 'DISTANCE TRAVELED BY RANK',
	    showlegend: false
	});
}

async function boxplot_velocity_to_death_by_rank(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let arr_velocities = []

	for(let i=1;i<64;i++){
		arr_velocities.push([])
	}

	for(match of data){
		for(player of match.players){
			if(player.ranking != 1) 
				arr_velocities[player.ranking - 1].push(distance(
				player.death_position[0], 
				player.death_position[1], 
				player.touchdown_position[0], 
				player.touchdown_position[1]
			)/(player.death_time-match.start_time))
			else arr_velocities[player.ranking - 1].push(distance(
				match.last_gas_center[0], 
				match.last_gas_center[1], 
				player.touchdown_position[0], 
				player.touchdown_position[1]
			)/(match.end_time-match.start_time))
		}
	}

	let traces = []

	for(let i=0;i<arr_velocities.length;i++){
		traces.push({
	        type: 'box',
	        marker: {color:'hsl('+ (i/3+45)+'%,65%'+',50%)'},
	        y: arr_velocities[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot6', traces, {
	    title: 'VELOCITY TRAVELED BY RANK',
	    showlegend: false
	});
}

async function boxplot_gas_center_distance_by_rank(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let arr_gasdist = []

	for(let i=1;i<64;i++){
		arr_gasdist.push([])
	}

	for(match of data){
		for(player of match.players){
			arr_gasdist[player.ranking - 1].push(distance(
				player.touchdown_position[0], 
				player.touchdown_position[1], 
				match.last_gas_center[0], 
				match.last_gas_center[1]
			))
		}
	}

	let traces = []

	for(let i=0;i<arr_gasdist.length;i++){
		traces.push({
	        type: 'box',
	        marker: {color:'hsl('+ (i/2+60)+'%,65%'+',50%)'},
	        y: arr_gasdist[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot7', traces, {
	    title: 'DISTANCE TO GAS CENTER BY RANK',
	    showlegend: false
	});
}

async function boxplot_center_map_distance_by_rank(data){
	function distance(x1, y1, x2, y2){
		return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))
	}

	let arr_centerdist = []

	for(let i=1;i<64;i++){
		arr_centerdist.push([])
	}

	for(match of data){
		for(player of match.players){
			arr_centerdist[player.ranking - 1].push(distance(
				player.touchdown_position[0], 
				player.touchdown_position[1], 
				2300.0, 
				2300.0
			))
		}
	}

	let traces = []

	for(let i=0;i<arr_centerdist.length;i++){
		traces.push({
	        type: 'box',
	        marker: {color:'hsl('+ i+'%,65%'+',50%)'},
	        y: arr_centerdist[i],
	        name: (i+1),
	        boxpoints: false,
	        line: {
	            width: 1
	        }

    	})
	}
	
	Plotly.newPlot('boxplot8', traces, {
	    title: 'DISTANCE TO MAP CENTER BY RANK',
	    showlegend: false
	});
}