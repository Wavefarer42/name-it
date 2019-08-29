import axios from "axios";

const apiKey = "X1FKWAES9KRDW27T";
const ax = axios.create({
    baseURL: "https://api.thetvdb.com",
    timeout: 1000
});
let obtainedToken = null;
export default {
    async login() {
        const payload = {"apikey": apiKey};

        try {
            const response = await ax.post("/login", payload);
            console.log(response);
            obtainedToken = true;
            ax.defaults.common["Authorization"] = "Bearer " + response.data["token"]
        } catch (e) {
            console.error(e);
            throw e
        }
    },
    async searchSeries(title) {

        const params = {name: title};

        try {
            const response = await ax.get("/search/series", {params: params});
            console.log(response);

            return response.data["data"]
        } catch (e) {
            console.error(e);
            throw e
        }
    },
    async loadSeriesSeasons(seriesId) {

        try {
            const response = await ax.get(`/series/${seriesId}/episodes/summary`);
            console.log(response);

            return response.data["data"]["airedSeasons"]
        } catch (e) {
            console.error(e);
            throw e
        }
    },
    async loadSeasonEpisodes(seriesId, season) {

        const params = {airedSeason: season};

        try {
            const response = await ax.get(`/series/${seriesId}/episodes/query`, {params: params});
            console.log(response);

            return response.data["data"]
        } catch (e) {
            console.error(e);
            throw e
        }
    }
}
