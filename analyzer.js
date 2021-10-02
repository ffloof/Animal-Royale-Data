
async function analyze(files){
	let data = []
	for (f of files) {
		data.push(JSON.parse(await f.text()))
	}
	//console.log(data)

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

	var trace1 = {
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
var trace2 = {
  x: x,
  y: y,
  name: 'density',
  ncontours: 20,
  colorscale: 'Hot',
  reversescale: true,
  showscale: false,
  type: 'histogram2dcontour'
};
var trace3 = {
  x: x,
  name: 'x density',
  marker: {color: 'rgb(102,0,0)'},
  yaxis: 'y2',
  type: 'histogram'
};
var trace4 = {
  y: y,
  name: 'y density',
  marker: {color: 'rgb(102,0,0)'},
  xaxis: 'x2',
  type: 'histogram'
};
var otherdata = [trace1, trace2, trace3, trace4];
var layout = {
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