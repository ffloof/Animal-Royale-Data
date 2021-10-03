

async function analyze(files){
    let data = []
    for (f of files) {
        data.push(JSON.parse(await f.text()))
    }
    game_length(data)
}


async function game_length(data){
    let x = []
    let y = []

    let i = 0
    for (match of data) {
        if(match.end_time - match.start_time > 450) continue
        x[i] = match.end_time - match.start_time
        i+=1
    }

    console.log(x.sort(function(a, b){return a-b}))

    for(let a=0; a<=i; a++){ //Percent of players dropped by this point
        y[a] = a/i * 100
    }
    

    let trace = {
        x: x,
        y: y,
        type: 'scatter'
    };

    Plotly.newPlot('tester', [trace]);
}

async function time_dropped(data){
    let x = []
    let y = []

    let i = 0
    for (match of data) {
        for (player of match.players){
            if(player.jump_time < 1.0 || player.jump_time - match.start_time > 200) continue 
            x[i] = player.jump_time - match.start_time
            i+=1
        }
    }

    console.log(x.sort(function(a, b){return a-b}))

    for(let a=0; a<=i; a++){ //Percent of players dropped by this point
        y[a] = a/i * 100
    }
    

    let trace = {
        x: x,
        y: y,
        type: 'scatter'
    };

    Plotly.newPlot('tester', [trace]);
}

async function winner_landing_heatmap(data){
    let i=0
    let x=[]
    let y=[]
    for (match of data) {
        for (player of match.players){
            if(player.ranking != 1) continue
            x[i] = player.touchdown_position[0]
            y[i] = player.touchdown_position[1]
            i += 1
        }
    }

    let trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      name: 'points',
      marker: {
        color: 'rgb(102,0,0)',
        size: 2,
        opacity: 0.4
      },
      type: 'scatter'
    };
    let trace2 = {
      x: x,
      y: y,
      name: 'density',
      ncontours: 20,
      colorscale: 'Hot',
      reversescale: true,
      showscale: false,
      type: 'histogram2dcontour'
    };
    let trace3 = {
      x: x,
      name: 'x density',
      marker: {color: 'rgb(102,0,0)'},
      yaxis: 'y2',
      type: 'histogram'
    };
    let trace4 = {
      y: y,
      name: 'y density',
      marker: {color: 'rgb(102,0,0)'},
      xaxis: 'x2',
      type: 'histogram'
    };
    let otherdata = [trace1, trace2, trace3, trace4];
    let layout = {
      showlegend: false,
      autosize: false,
      width: 600,
      height: 550,
      margin: {t: 50},
      hovermode: 'closest',
      bargap: 0,
      xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      },
      yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      }
    };

    Plotly.newPlot('tester', otherdata, layout);
}

async function time_dropped_vs_rank(data){
    let x = []
    let y = []
    let y2 = []
    for(let i=1;i<64;i++){
        x[i-1] = i
        y[i-1] = 0
        y2[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            if (player.jump_time < 1.0 || player.touchdown_time < 1.0) continue
            y[player.ranking-1] += player.jump_time - match.start_time
            y2[player.ranking-1] += player.touchdown_time - match.start_time
        }
    }

    for(let i=0; i<y.length;i++){
        y[i] /= data.length
        y2[i] /= data.length
        if(i==1||i==0) {
            y[i] /= 2
            y2[i] /= 2
        }
    }

    let trace = {
        x: x,
        y: y,
        name: 'average time to jump',
        type: 'scatter'
    };

    let trace2 = {
        x: x,
        y: y2,
        name: 'average time to land',
        type:'scatter'
    }

    Plotly.newPlot('tester', [trace2, trace]);
}

async function time_alive_vs_rank(data){
    let x = []
    let y = []
    for(let i=1;i<64;i++){
        x[i-1] = i
        y[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            if (player.ranking != 1) y[player.ranking-1] += player.death_time - match.start_time
            else y[0] += match.end_time - match.start_time
        }
    }


    //Get an average
    let average = 0 
    for(let i=0; i<y.length;i++){
        y[i] /= data.length 
        average += y[i]
    }
    average /= y.length
    console.log(average)

    //Get average line
    let avg = []
    for (let i=0;i<y.length;i++){
        avg[i] = average
    }

    let trace = {
        x: x,
        y: y,
        type: 'scatter'
    };

    let trace2 = {
        x: x,
        y: avg,
        type:'scatter'
    }

    Plotly.newPlot('tester', [trace2, trace]);
}

async function gas_center_distance_vs_rank(data){
    function distance(x1,y1,x2,y2){
        return Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)))
    }

    let x = []
    let y = []
    for(let i=1;i<64;i++){
        x[i-1] = i
        y[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            y[player.ranking-1] += distance(
                player.touchdown_position[0], player.touchdown_position[1],
                match.last_gas_center[0], match.last_gas_center[1]
            )
        }
    }


    //Get an average
    let average = 0 
    for(let i=0; i<y.length;i++){
        y[i] /= data.length 
        average += y[i]
    }
    average /= y.length
    console.log(average)

    //Get average line
    let avg = []
    for (let i=0;i<y.length;i++){
        avg[i] = average
    }

    let trace = {
        x: x,
        y: y,
        type: 'scatter'
    };

    let trace2 = {
        x: x,
        y: avg,
        type:'scatter'
    }

    Plotly.newPlot('tester', [trace2, trace]);
}


//Bugged because ingas death is recorded incorrectly towards the start of the game
/*
async function gas_death_vs_rank(data){
    let x = []
    let y = []
    for(let i=1;i<64;i++){
        x[i-1] = i
        y[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            y[player.ranking-1] += player.died_in_gas ? 1 : 0
        }
    }


    //Convert to percent
    let average = 0 
    for(let i=0; i<y.length;i++){
        y[i] /= data.length 
        y[i] *= 100 
        average += y[i]
    }
    average /= y.length
    console.log(average)

    //Get average line
    let avg = []
    for (let i=0;i<y.length;i++){
        avg[i] = average
    }

    let trace = {
        x: x,
        y: y,
        name: '% gas death by rank',
        type: 'scatter'
    };

    let trace2 = {
        x: x,
        y: avg,
        name: 'average',
        type:'scatter'
    }

    Plotly.newPlot('tester', [trace2, trace]);
}*/


//Density of where players land
async function landing_heatmap(data){
	let i=0
	let x=[]
	let y=[]
	for (match of data) {
		for (player of match.players){
			x[i] = player.touchdown_position[0]
			y[i] = player.touchdown_position[1]
			i += 1
		}
	}

	let trace1 = {
	  x: x,
	  y: y,
	  mode: 'markers',
	  name: 'points',
	  marker: {
	    color: 'rgb(102,0,0)',
	    size: 2,
	    opacity: 0.4
	  },
	  type: 'scatter'
	};
    let trace2 = {
      x: x,
      y: y,
      name: 'density',
      ncontours: 20,
      colorscale: 'Hot',
      reversescale: true,
      showscale: false,
      type: 'histogram2dcontour'
    };
    let trace3 = {
      x: x,
      name: 'x density',
      marker: {color: 'rgb(102,0,0)'},
      yaxis: 'y2',
      type: 'histogram'
    };
    let trace4 = {
      y: y,
      name: 'y density',
      marker: {color: 'rgb(102,0,0)'},
      xaxis: 'x2',
      type: 'histogram'
    };
    let otherdata = [trace1, trace2, trace3, trace4];
    let layout = {
      showlegend: false,
      autosize: false,
      width: 600,
      height: 550,
      margin: {t: 50},
      hovermode: 'closest',
      bargap: 0,
      xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      },
      yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      }
    };

	Plotly.newPlot('tester', otherdata, layout);
}

//Density of where players die
async function death_heatmap(data){
    let i=0
    let x=[]
    let y=[]
    for (match of data) {
        for (player of match.players){
            x[i] = player.death_position[0]
            y[i] = player.death_position[1]
            i += 1
        }
    }

    let trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      name: 'points',
      marker: {
        color: 'rgb(102,0,0)',
        size: 2,
        opacity: 0.4
      },
      type: 'scatter'
    };
    let trace2 = {
      x: x,
      y: y,
      name: 'density',
      ncontours: 20,
      colorscale: 'Hot',
      reversescale: true,
      showscale: false,
      type: 'histogram2dcontour'
    };
    let trace3 = {
      x: x,
      name: 'x density',
      marker: {color: 'rgb(102,0,0)'},
      yaxis: 'y2',
      type: 'histogram'
    };
    let trace4 = {
      y: y,
      name: 'y density',
      marker: {color: 'rgb(102,0,0)'},
      xaxis: 'x2',
      type: 'histogram'
    };
    let otherdata = [trace1, trace2, trace3, trace4];
    let layout = {
      showlegend: false,
      autosize: false,
      width: 600,
      height: 550,
      margin: {t: 50},
      hovermode: 'closest',
      bargap: 0,
      xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      },
      yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      }
    };

    Plotly.newPlot('tester', otherdata, layout);
}

//Density of where players land
async function jump_heatmap(data){
    let i=0
    let x=[]
    let y=[]
    for (match of data) {
        for (player of match.players){
            x[i] = player.jump_position[0]
            y[i] = player.jump_position[1]
            i += 1
        }
    }

    let trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      name: 'points',
      marker: {
        color: 'rgb(102,0,0)',
        size: 2,
        opacity: 0.4
      },
      type: 'scatter'
    };
    let trace2 = {
      x: x,
      y: y,
      name: 'density',
      ncontours: 20,
      colorscale: 'Hot',
      reversescale: true,
      showscale: false,
      type: 'histogram2dcontour'
    };
    let trace3 = {
      x: x,
      name: 'x density',
      marker: {color: 'rgb(102,0,0)'},
      yaxis: 'y2',
      type: 'histogram'
    };
    let trace4 = {
      y: y,
      name: 'y density',
      marker: {color: 'rgb(102,0,0)'},
      xaxis: 'x2',
      type: 'histogram'
    };
    let otherdata = [trace1, trace2, trace3, trace4];
    let layout = {
      showlegend: false,
      autosize: false,
      width: 600,
      height: 550,
      margin: {t: 50},
      hovermode: 'closest',
      bargap: 0,
      xaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        domain: [0, 0.85],
        showgrid: false,
        zeroline: false
      },
      xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      },
      yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      }
    };

    Plotly.newPlot('tester', otherdata, layout);
}