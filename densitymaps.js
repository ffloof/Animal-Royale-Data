async function densitymap_landing(data){
	let x = []
	let y = []

	for(match of data){
		for(player of match.players){
			x.push(player.touchdown_position[0])
			y.push(player.touchdown_position[1])
		}
	}

	let traces = [
		{
			x: x,
			y: y,
			mode: 'markers',
			name: 'points',
			marker: {
				color: 'rgb(102,0,0)',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: 'Hot',
			reversescale: true,
			showscale: false,
			type: 'histogram2dcontour'
		}
	]

	Plotly.newPlot('densitymap1', traces, {
	    hovermode: 'closest',
	    title: 'LANDING SPOT DENSITY MAP',
	});
}

async function densitymap_death(data){
	let x = []
	let y = []

	for(match of data){
		for(player of match.players){
			if(player.ranking != 1){
				x.push(player.death_position[0])
				y.push(player.death_position[1])
			} else {
				x.push(match.last_gas_center[0])
				y.push(match.last_gas_center[1])
			}
		}
	}

	let traces = [
		{
			x: x,
			y: y,
			mode: 'markers',
			name: 'points',
			marker: {
				color: 'rgb(102,0,0)',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: 'Hot',
			reversescale: true,
			showscale: false,
			type: 'histogram2dcontour'
		}
	]

	Plotly.newPlot('densitymap2', traces, {
	    hovermode: 'closest',
	    title: 'DEATH SPOT DENSITY MAP',
	});
}

async function densitymap_jump(data){
	let x = []
	let y = []

	for(match of data){
		for(player of match.players){
			x.push(player.jump_position[0])
			y.push(player.jump_position[1])
		}
	}

	let traces = [
		{
			x: x,
			y: y,
			mode: 'markers',
			name: 'points',
			marker: {
				color: 'rgb(102,0,0)',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: 'Hot',
			reversescale: true,
			showscale: false,
			type: 'histogram2dcontour'
		}
	]

	Plotly.newPlot('densitymap3', traces, {
	    hovermode: 'closest',
	    title: 'JUMP SPOT DENSITY MAP',
	});
}

async function densitymap_winner(data){
	let x = []
	let y = []

	for(match of data){
		for(player of match.players){
			if(player.ranking != 1) continue
			x.push(player.touchdown_position[0])
			y.push(player.touchdown_position[1])
		}
	}

	let traces = [
		{
			x: x,
			y: y,
			mode: 'markers',
			name: 'points',
			marker: {
				color: 'rgb(102,0,0)',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: 'Hot',
			reversescale: true,
			showscale: false,
			type: 'histogram2dcontour'
		}
	]

	Plotly.newPlot('densitymap4', traces, {
	    hovermode: 'closest',
	    title: 'WINNER LANDING SPOT DENSITY MAP',
	});
}