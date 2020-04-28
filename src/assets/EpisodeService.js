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
    async search(title, season = null, language = "en") {
        const series = await TvDbRepository.searchSeries(title, language);

        let result = null;
        if (series.length > 0) {
            const seasons = await Promise.all(series.map(it => TvDbRepository.loadSeriesSeasons(it.id, language)));

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
    async loadSeasonEpisodes(series, language = "en") {

        const episodes = await TvDbRepository.loadSeasonEpisodes(series.id, series.season, language);

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
    normalizeFileNames(name, blacklist) {
        if(blacklist === null || blacklist.length === 0 || name === null || name.length === 0 ){
            return name
        }

        const blacklistSet = new Set(blacklist)
        return Array.from(name).map(c => blacklistSet.has(c) ? '' : c).join('')
    },
    formatEpisodeName(episode, format, blacklist) {
        let name = format.replace("{series}", episode.seriesTitle)
            .replace("{episode}", episode.episodeTitle);

        name = replaceNumberPattern(name, episode.episodeNumber, episodeNumberRegex);
        name = replaceNumberPattern(name, episode.episodeNumber, episodeNumberRegexPrefix, "E");
        name = replaceNumberPattern(name, episode.seasonNumber, seasonNumberRegex);
        name = replaceNumberPattern(name, episode.seasonNumber, seasonNumberRegexPrefix, "S");

        return this.normalizeFileNames(name, blacklist)
    }
}
