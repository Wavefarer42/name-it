import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchRequest: false,
        selectedSeries: null,
        denseLists:false,
        selectedItem:null,
        files: [
            {
                name: "file name",
                path: "some/path/file nameasdfffffffffffffffffffffffffffffffffffffasdasdfasssssssssssssssssssssssssssssssss",
                extension: "ext."
            },
            {
                name: "foo",
                path: "some/path/foo",
                extension: "ext."
            },
            {
                name: "bar",
                path: "some/path/bar",
                extension: "ext."
            }
        ],
        loadingEpisodes:false,
        episodes: [
            {
                "id": 1,
                "title": "some episode",
                "episodeNumber": 0,
                "date": "2019-2-12",
            },
            {
                "id": 2,
                "title": "other episode",
                "episodeNumber": 1,
                "date": "2019-2-12",
            }
        ]
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
        setLoadingEpisode(state, val){
            state.loadingEpisodes = val
        },
        setDenseLists(state, val){
            state.denseLists = val
        },
        setSelectedItem(state, val){
            state.selectedItem = val
        }
    },
    actions: {}
})
