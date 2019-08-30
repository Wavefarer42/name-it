import TvDbRepository from "./TvDbRepository";

const assert = require("assert");

export default {
    async search(title, season) {
        const series = await TvDbRepository.searchSeries(title);

        let result = null;
        if (series.length > 0) {
            const seasons = await Promise.all(series.map(it => TvDbRepository.loadSeriesSeasons(it.id)));

            assert(series.length === seasons.length);

            result = [];
            let i;
            for (i = 0; i < series.length; i++) {
                if (seasons[i].indexOf(season.toString()) >= 0) {
                    result.push({
                        id: series[i]["id"],
                        title: series[i]["seriesName"],
                        airdate: series[i]["firstAired"],
                        abstract: series[i]["overview"],
                        season: season,
                        seasonTotal: seasons[i].length
                    })
                }
            }
        }

        return result
    },
    async loadSeasonEpisodes(seriesId, season) {

        const episodes = await TvDbRepository.loadSeasonEpisodes(seriesId, season);

        return episodes.map(it => {
            return {
                id: it["id"],
                title: it["episodeName"],
                episodeNumber: parseInt(it["airedEpisodeNumber"]),
                date: it["firstAired"]
            }
        }).sort((a, b) => a.episodeNumber - b.episodeNumber)
    }
}
