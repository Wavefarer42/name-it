<template>

  <v-dialog v-model="searchRequest" width="75%" max-width="75%">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Search
      </v-card-title>

      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="11">
              <v-text-field v-model="seriesTitle"
                            label="Series"
                            hint="Game of Thrones"
                            @keyup.enter.native="handleRequest"
                            required
                            persistent-hint></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field v-model="season"
                            label="Season"
                            hint="2"
                            required
                            @keyup.enter.native="handleRequest"
                            persistent-hint></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="2">
              <v-btn color="primary" width="100%"
                     :disabled="!seriesTitle || !season"
                     :loading="loadingSearch"
                     @click="handleRequest">
                search
              </v-btn>
            </v-col>
          </v-row>
          <v-snackbar v-model="snackbar"
                      :color="snackColor"
                      text>
            {{snackInfo}}
            <v-btn color="blue"
                   text
                   @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item-group v-model="seriesSelection" color="primary">
                  <template v-for="it in paginatedSearchResults">
                    <v-list-item :value="it">
                      <v-list-item-content>
                        <v-list-item-title>{{it.title}}</v-list-item-title>
                        <v-list-item-subtitle>
                          Season {{it.season}}<span v-if="it.airdate">, {{it.airdate}}</span><span v-if="it.status">, {{it.status}}</span>
                        </v-list-item-subtitle>
                        <span v-if="it.abstract" class="caption">{{it.abstract}}</span>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
              <v-pagination v-if="paginationLength > 1" v-model="page" :length="paginationLength"
                            total-visible="5"></v-pagination>
            </v-col>
          </v-row>
        </v-container>
      </v-form>


      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="cancelRequest" text outlined>
          Cancel
        </v-btn>
        <v-btn color="primary" @click="finishRequest"
               :disabled="!seriesSelection"
               :loading="loadingEpisodes"
               text outlined>
          Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
    import EpisodeService from "../assets/EpisodeService";

    export default {
        name: "SearchPopup",
        data: function () {
            return {
                snackbar: false,
                snackColor: "primary",
                snackInfo: null,
                loadingSearch: false,
                loadingEpisodes: false,
                page: 1,
                pageLimit: 5,
                searchResults: [],
                seriesSelection: null,
                seriesTitle: null,
                season: null
            }
        },
        computed: {
            searchRequest: {
                get: function () {
                    return this.$store.state.searchRequest
                },
                set: function (value) {
                    this.$store.commit("setSearchRequest", value)
                }
            },
            paginationLength: function () {
                return Math.ceil(this.searchResults.length / this.pageLimit)
            },
            paginatedSearchResults: function () {
                const start = (this.page - 1) * this.pageLimit;
                const end = start + this.pageLimit;
                return this.searchResults.slice(start, end)
            }
        },
        methods: {
            handleRequest: function () {
                if (this.seriesTitle && this.season) {
                    this.loadingSearch = true;
                    EpisodeService.search(this.seriesTitle, this.season)
                        .then(it => {
                            if (it === null) {
                                this.snackInfo = "No results found.";
                                this.snackColor = "primary";
                                this.snackbar = true
                            } else {
                                this.searchResults = it
                            }
                        })
                        .catch(it => {
                            this.snackInfo = "Something went wrong during loadingSearch :/";
                            this.snackColor = "red";
                            this.snackbar = true
                        })
                        .finally(it => {
                            this.loadingSearch = false
                        })
                }

            },
            finishRequest: function () {
                //TODO move into episode list
                EpisodeService.loadSeasonEpisodes(this.seriesSelection)
                    .then(it => {
                        this.$store.commit("setEpisodes", it);
                        if (it.length > 10) {
                            this.$store.commit("setDenseLists", true)
                        }
                    })
                    .finally(it => {
                        this.$store.commit("setLoadingEpisode", false)
                    });

                this.$store.commit("setLoadingEpisode", true);
                this.$store.commit("selectSeries", this.seriesSelection);
                this.$store.commit("setSearchRequest", false)
            },
            cancelRequest: function () {
                this.$store.commit("setSearchRequest", false)
            }
        }
    }
</script>

<style scoped>

</style>
