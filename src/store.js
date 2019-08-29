import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchRequest: false,
        selectedSeries: null
    },
    mutations: {
        issueSearchRequest(state) {
            state.searchRequest = true;
        },
        finishSearchRequest(state) {
            state.searchRequest = false;
        },
        selectSeries(state, selection) {
            state.selectedSeries = selection
        }
    },
    actions: {}
})
