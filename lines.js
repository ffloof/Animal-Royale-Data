async function line_time_dropped_vs_rank(data){
    let ranks = []
    
    let avg_jump = []
    let avg_land = []

    let amount = []
    
    for(let i=1;i<64;i++){
        ranks[i-1] = i
        avg_jump[i-1] = 0
        avg_land[i-1] = 0
        amount[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            avg_jump[player.ranking-1] += player.jump_time - match.start_time
            avg_land[player.ranking-1] += player.touchdown_time - match.start_time
            amount[player.ranking-1] += 1
        }
    }

    for(let i=0; i<ranks.length;i++){
        avg_jump[i] /= amount[i]
        avg_land[i] /= amount[i]
    }

    let total_jump = 0
    let total_land = 0

    for(let i=0; i<ranks.length;i++){
        total_jump += avg_jump[i]
        total_land += avg_land[i]
    }

    total_jump /= ranks.length
    total_land /= ranks.length

    line_total_jump = []
    line_total_land = []

    for(let i=0; i<ranks.length;i++){
        line_total_jump[i] = total_jump
        line_total_land[i] = total_land
    }

    let traces = [{
        x: ranks,
        y: avg_jump,
        name: 'average time to jump by rank',
    }, {
        x: ranks,
        y: avg_land,
        name: 'average time to land by rank',
    }, {
        x: ranks,
        y: line_total_jump,
        name: 'overall average time to jump',
        line: {
            dash: 'dot',
            width: 4
        }   
    }, {
        x: ranks,
        y: line_total_land,
        name: 'overall average time to land',
        line: {
            dash: 'dot',
            width: 4
        }
    }]

    Plotly.newPlot("line1", traces);
}

async function line_gas_death_by_rank(data){
    let ranks = []
    
    let avg_gas = []

    let amount = []
    
    for(let i=1;i<64;i++){
        ranks[i-1] = i
        avg_gas[i-1] = 0
        amount[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            avg_gas[player.ranking-1] += player.died_in_gas
            amount[player.ranking-1] += 1
        }
    }

    for(let i=0; i<ranks.length;i++){
        avg_gas[i] /= amount[i]
        avg_gas[i] *= 100
    }

    let total_gas = 0

    for(let i=0; i<ranks.length;i++){
        total_gas += avg_gas[i]
    }

    total_gas /= ranks.length

    line_total_gas = []

    for(let i=0; i<ranks.length;i++){
        line_total_gas[i] = total_gas
    }

    let traces = [{
        x: ranks,
        y: avg_gas,
        name: 'average gas death % by rank',
    }, {
        x: ranks,
        y: line_total_gas,
        name: 'gas death % overall average',
        line: {
            dash: 'dot',
            width: 4
        }   
    }]

    Plotly.newPlot("line2", traces);
}

async function line_time_alive_vs_rank(data){
    let ranks = []
    
    let avg_alive = []

    let amount = []
    
    for(let i=1;i<64;i++){
        ranks[i-1] = i
        avg_alive[i-1] = 0
        amount[i-1] = 0
    }

    for (match of data) {
        for (player of match.players){
            if(player.ranking != 1) avg_alive[player.ranking-1] += player.death_time - match.start_time 
            else avg_alive[player.ranking-1] += match.end_time - match.start_time 
            amount[player.ranking-1] += 1
        }
    }

    for(let i=0; i<ranks.length;i++){
        avg_alive[i] /= amount[i]
    }

    let total_alive = 0

    for(let i=0; i<ranks.length;i++){
        total_alive += avg_alive[i]
    }

    total_alive /= ranks.length

    line_total_alive = []

    for(let i=0; i<ranks.length;i++){
        line_total_alive[i] = total_alive
    }

    let traces = [{
        x: ranks,
        y: avg_alive,
        name: 'average time alive by rank',
    }, {
        x: ranks,
        y: line_total_alive,
        name: 'overall average time alive',
        line: {
            dash: 'dot',
            width: 4
        }   
    }]

    Plotly.newPlot("line3", traces);
}
