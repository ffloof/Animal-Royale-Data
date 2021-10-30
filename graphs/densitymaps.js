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
				color: '#880000',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: 'YlOrRd',
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
				color: '#880000',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			reversescale: true,
			showscale: false,
			colorscale: 'Greys',
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
				color: '#000000',
				size: 2,
				opacity: 0.4
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: 'YlGnBu',
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
				color: '#FFFFFF',
				size: 2.5,
				opacity: 0.5
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			colorscale: [
				['0.0', '#000044'],
				['1.0', '#4488CC']
  			],
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

async function densitymap_gasdeath(data){
	let x = []
	let y = []

	for(match of data){
		for(player of match.players){
			if(player.ranking != 1 && player.died_in_gas){
				x.push(player.death_position[0])
				y.push(player.death_position[1])
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
				color: '#000000',
				size: 2,
				opacity: 0.5
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			reversescale: true,
			showscale: false,
			colorscale: 'Greens',
			type: 'histogram2dcontour'
		}
	]

	Plotly.newPlot('densitymap5', traces, {
	    hovermode: 'closest',
	    title: 'GAS DEATH DENSITY MAP',
	});
}

async function densitymap_gascenter(data){
	let x = []
	let y = []

	for(match of data){
		x.push(match.last_gas_center[0])
		y.push(match.last_gas_center[1])
	}

	let traces = [
		{
			x: x,
			y: y,
			mode: 'markers',
			name: 'points',
			marker: {
				color: '#000000',
				size: 2,
				opacity: 0.5
			},
			type: 'scattergl'
		}, {
			x: x,
			y: y,
			name: 'density',
			ncontours: 20,
			reversescale: true,
			showscale: false,
			colorscale: 'Greens',
			type: 'histogram2dcontour'
		}
	]

	Plotly.newPlot('densitymap6', traces, {
	    hovermode: 'closest',
	    title: 'LAST GAS CENTER DENSITY MAP',
	});
}