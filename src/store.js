import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchRequest: false,
        settings: false,
        selectedSeries: null,
        denseLists: false,
        selectedItem: null,
        files: [],
        loadingEpisodes: false,
        episodes: [],
        nameFormat: "{e00} - {series} - {episode} - {S00}{E00}",
        language:{"name": "English", "code": "en"}
    },
    mutations: {
        setSearchRequest(state, val) {
            state.searchRequest = val
        },
        selectSeries(state, selection) {
            state.selectedSeries = selection
        },
        setEpisodes(state, episodes) {
            state.episodes = episodes
        },
        setFiles(state, files) {
            state.files = files
        },
        setLoadingEpisode(state, val) {
            state.loadingEpisodes = val
        },
        setDenseLists(state, val) {
            state.denseLists = val
        },
        setSelectedItem(state, val) {
            state.selectedItem = val
        },
        setSettings(state, val) {
            state.settings = val
        },
        setNameFormat(state, val) {
            state.nameFormat = val
        },
        setLanguage(state, val){
            state.language = val
        }
    },
    actions: {}
})
