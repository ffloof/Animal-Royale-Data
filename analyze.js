
async function analyze(files){
    //Convert json data to objects
    let data = []
    for (f of files) {
        let match = JSON.parse(await f.text())
        match.name = f.name
        data.push(match)
    }

    //Run checks on data and print errors to console
    verify(data)

    //Resize divs that plots will be displayed in
    for(node of document.body.children) {
        if(node.nodeName == "DIV"){
            node.style.height = "900px"
            node.style.width = "900px"
        }
    }

    //Plot everything
    line_time_dropped_vs_rank(data)
    line_gas_death_by_rank(data)
    line_time_alive_vs_rank(data)

    boxplot_time_jumped_by_rank(data)
    boxplot_time_landed_by_rank(data)
    boxplot_time_parachuting_by_rank(data)
    boxplot_time_death_by_rank(data)
    boxplot_distance_to_death_by_rank(data)
    boxplot_velocity_to_death_by_rank(data)
    boxplot_gas_center_distance_by_rank(data)
    boxplot_center_map_distance_by_rank(data)

    densitymap_landing(data)
    densitymap_death(data)
    densitymap_jump(data)
    densitymap_winner(data)
    densitymap_gasdeath(data)
    densitymap_gascenter(data)

    bar_players_center(data)
    bar_gas_death_distance_center(data)
    bar_avg_rank_distance_center(data)

    //heatmap_gas_death(data)
    heatmap_avg_rank(data)
}