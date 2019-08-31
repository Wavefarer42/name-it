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
                            autofocus
                            required
                            id="seriesField"
                            ref="seriesField"
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
                     :disabled="!seriesTitle"
                     :loading="loadingSearch"
                     @click="handleRequest">
                search
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="searchResults !== null && searchResults.length > 0"
                   cols="12">
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
                            total-visible="7"></v-pagination>
            </v-col>
            <v-col v-else
                   cols="12">
              <p v-if="searchResults === null" class="grey--text text-center">Search for series...</p>
              <p v-else class="red--text text-center">No series found</p>
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
               :disabled="selectDisabled"
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
                loadingSearch: false,
                loadingEpisodes: false,
                page: 1,
                pageLimit: 5,
                searchResults: null,
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
            },
            selectDisabled: function () {
                return this.searchResults === null || this.searchResults.length === 0 || this.seriesSelection === null
            }
        },
        methods: {
            handleRequest: function () {
                this.loadingSearch = true;
                EpisodeService.search(this.seriesTitle, this.season)
                    .then(it => {
                        if (it === null) {
                            this.searchResults = []
                        } else {
                            this.searchResults = it
                        }
                    })
                    .catch(it => {
                        this.$store.dispatch("notifyUser", {
                            msg: "Could not search for series :/",
                            color: "error"
                        })
                    })
                    .finally(it => {
                        this.loadingSearch = false
                    })
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
                    .catch(it => {
                        this.$store.dispatch("notifyUser", {
                            msg: "Could not load episodes :/",
                            color: "error"
                        })
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
        },
        watch: {
            searchRequest: function (val) {
                if (val && "seriesField" in this.$refs) {
                    this.$nextTick(this.$refs.seriesField.focus);
                }
            }
        }
    }
</script>

<style scoped>

</style>
