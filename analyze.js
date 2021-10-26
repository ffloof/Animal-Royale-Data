
async function analyze(files){
    let data = []
    for (f of files) {
        let match = JSON.parse(await f.text())
        match.name = f.name
        data.push(match)
    }

    verify(data)

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

    bar_players_center(data)
    bar_gas_death_distance_center(data)
    bar_avg_rank_distance_center(data)

    heatmap_gas_death(data)
    heatmap_avg_rank(data)
}