import TvDbRepository from "./TvDbRepository";
import _ from "lodash";

const assert = require("assert");


const episodeNumberRegex = /{e\d*}/gm;
const episodeNumberRegexPrefix = /{E\d*}/gm;
const seasonNumberRegex = /{s\d*}/gm;
const seasonNumberRegexPrefix = /{S\d*}/gm;

function replaceNumberPattern(string, number, regex, prefix = "") {
    let match;
    while ((match = regex.exec(string)) !== null) {
        const zeroCount = match[0].split("0").length - 1;
        const episodeNumber = _.padStart(number.toString(), zeroCount, "0");
        string = string.replace(match[0], `${prefix}${episodeNumber}`)
    }
    return string
}

export default {
    async search(title, season = null) {
        const series = await TvDbRepository.searchSeries(title);

        let result = null;
        if (series.length > 0) {
            const seasons = await Promise.all(series.map(it => TvDbRepository.loadSeriesSeasons(it.id)));

            assert(series.length === seasons.length);

            result = [];
            for (let seriesIdx = 0; seriesIdx < series.length; seriesIdx++) {
                for (let seasonIdx = 0; seasonIdx < seasons[seriesIdx].length; seasonIdx++) {
                    if (season === null || seasons[seriesIdx][seasonIdx] === season) {
                        result.push({
                            id: series[seriesIdx]["id"],
                            title: series[seriesIdx]["seriesName"],
                            airdate: series[seriesIdx]["firstAired"],
                            abstract: series[seriesIdx]["overview"],
                            season: parseInt(seasons[seriesIdx][seasonIdx]),
                            seasonTotal: seasons[seriesIdx].length
                        })
                    }
                }
            }
            result = _.sortBy(result, ["season"])
        }

        return result
    },
    async loadSeasonEpisodes(series) {

        const episodes = await TvDbRepository.loadSeasonEpisodes(series.id, series.season);

        return episodes.map(it => {
            return {
                id: it["id"],
                episodeTitle: it["episodeName"],
                episodeNumber: parseInt(it["airedEpisodeNumber"]),
                seasonNumber: parseInt(it["airedSeason"]),
                seriesTitle: series.title,
                date: it["firstAired"]
            }
        }).sort((a, b) => a.episodeNumber - b.episodeNumber)
    },
    formatEpisodeName(episode, format) {
        let name = format.replace("{series}", episode.seriesTitle)
            .replace("{episode}", episode.episodeTitle);

        name = replaceNumberPattern(name, episode.episodeNumber, episodeNumberRegex);
        name = replaceNumberPattern(name, episode.episodeNumber, episodeNumberRegexPrefix, "E");
        name = replaceNumberPattern(name, episode.seasonNumber, seasonNumberRegex);
        name = replaceNumberPattern(name, episode.seasonNumber, seasonNumberRegexPrefix, "S");

        return name
    }
}
