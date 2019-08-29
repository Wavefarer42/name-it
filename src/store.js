import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchRequest: false,
        selectedSeries: null,
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
        episodes: [
          {
            "name": "some episode",
            "episodeNumber": 0,
            "date": "2019-2-12",
          },
          {
            "name": "other episode",
            "episodeNumber": 1,
            "date": "2019-2-12",
          }
        ]
    },
    mutations: {
        setSearchRequest(state, val){
          state.searchRequest = val
        },
        selectSeries(state, selection) {
            state.selectedSeries = selection
        },
        setEpisodes(state, episodes){
          state.episodes = episodes
        },
        setFiles(state, files){
          state.files = files
        }
    },
    actions: {}
})
