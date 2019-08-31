import axios from "axios";

const apiKey = "X1FKWAES9KRDW27T";
axios.defaults.baseURL = "http://localhost:57412/https://api.thetvdb.com";
let obtainedToken = null;

export default {
    async login() {
        const payload = {"apikey": apiKey};

        if (obtainedToken === null) {
            try {
                const response = await axios.post("/login", payload);
                obtainedToken = response.data["token"];
                axios.defaults.headers.get["Authorization"] = "Bearer " + obtainedToken
            } catch (e) {
                console.error(e);
                throw e
            }
        }
    },
    async searchSeries(title, language = "en") {
        await this.login();

        const params = {name: title};

        try {
            const response = await axios.get("/search/series",
                {
                    params: params,
                    headers: {"Accept-Language": language}
                });
            return response.data["data"]
        } catch (e) {
            if (e.response.status === 404) {
                return []
            } else {
                console.error(e);
                throw e
            }
        }
    },
    async loadSeriesSeasons(seriesId, language = "en") {
        await this.login();

        try {
            const response = await axios.get(`/series/${seriesId}/episodes/summary`,
                {headers: {"Accept-Language": language}}
            );
            return response.data["data"]["airedSeasons"]
        } catch (e) {
            if (e.response.status === 404) {
                return []
            } else {
                console.error(e);
                throw e
            }
        }
    },
    async loadSeasonEpisodes(seriesId, season, language = "en") {
        await this.login();

        const params = {airedSeason: season};

        try {
            const response = await axios.get(`/series/${seriesId}/episodes/query`,
                {
                    params: params,
                    headers: {"Accept-Language": language}
                });
            return response.data["data"]
        } catch (e) {
            console.error(e);
            throw e
        }
    }
}
