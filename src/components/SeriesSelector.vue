<template>

  <v-dialog v-model="searchRequest" width="75%" max-width="75%">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Search
      </v-card-title>

      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field v-model="seriesTitle" label="Series" hint="Games of Thrones" persistent-hint></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="season" label="Season" hint="2" persistent-hint></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-combobox v-model="languageSelection"
                          :items="languages"
                          item-text="name"
                          item-value="code"
                          label="Select"
                          persistent-hint
                          allow-overflow
                          single-line></v-combobox>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="2">
              <v-btn color="primary" width="100%"
                     :disabled="!seriesTitle || !season"
                     @click="handleRequest">
                search
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item-group v-model="seriesSelection" color="primary">
                  <template v-for="it in paginatedSearchResults">
                    <v-list-item :value="it">
                      <v-list-item-content>
                        <v-list-item-title>{{it.title}}</v-list-item-title>
                        <v-list-item-subtitle>
                          Season {{season}}<span v-if="it.airdate">, {{it.airdate}}</span><span v-if="it.status">, {{it.status}}</span>
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
               text outlined>
          Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
    import TvDbService from "../assets/TvDbService";

    export default {
        name: "SeriesSelector",
        data: function () {
            return {
                page: 1,
                pageLimit: 5,
                searchResults: [],
                seriesSelection: null,
                seriesTitle: "naruto",
                season: 2,
                languageSelection: {"name": "English", "code": "en"},
                languages: [
                    {"name": "English", "code": "en"},
                    {"name": "German", "code": "de"},
                    {"name": "Japanese", "code": "jp"},
                ]
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
                TvDbService.search(this.seriesTitle, this.season).then(it => this.searchResults = it)
            },
            finishRequest: function () {
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
