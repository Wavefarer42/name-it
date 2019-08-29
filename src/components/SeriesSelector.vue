<template>

  <v-dialog v-model="searchRequest" width="75%" max-width="75%">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Search
      </v-card-title>

      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-text-field v-model="seriesTitle" label="Series" hint="Games of Thrones"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="season" label="Season" hint="2"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="2">
              <v-select v-model="languageSelection"
                        :items="languages"
                        item-text="name"
                        item-value="code"
                        label="Select"
                        persistent-hint
                        single-line></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-subheader>Search Results</v-subheader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item-group v-model="seriesSelection" color="primary">
                  <template v-for="it in searchResults">
                    <v-list-item :value="it">
                      <v-list-item-content>
                        <v-list-item-title>{{it.title}}</v-list-item-title>
                        <v-list-item-subtitle v-if="it.abstract">{{it.abstract}}</v-list-item-subtitle>
                        <v-list-item-subtitle v-if="it.airdate || it.status">
                          {{it.airdate}}<span v-if="it.airdate && it.status">,</span> {{it.status}}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-form>


      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" @click="finishRequest" text>
          Select
        </v-btn>
      </v-card-actions>
    </v-card>


  </v-dialog>

</template>

<script>
    export default {
        name: "SeriesSelector",
        data: function () {
            return {
                searchResults: [
                    {
                        id: 1,
                        title: "naruto",
                        airdate: "2019-20-13",
                        abstract: "For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses line-clamp and is not supported in all browsers. For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses line-clamp and is not supported in all browsers. For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses line-clamp and is not supported in all browsers.",
                        season: 1,
                        status: "finished"
                    },
                    {
                        id: 2,
                        title: "boruto",
                        airdate: "2019-20-13",
                        abstract: "awesome dudes son",
                        season: 1,
                        status: "running"
                    },
                    {
                        id: 3,
                        title: "kaneki",
                        airdate: "2019-20-13",
                        abstract: "awesome dude",
                        season: 1,
                        status: "finished"
                    },
                    {
                        id: 4,
                        title: "kaneki",
                        airdate: "2019-20-13",
                        abstract: "awesome dude",
                        season: 1,
                        status: "finished"
                    },
                    {
                        id: 5,
                        title: "kaneki",
                        airdate: "2019-20-13",
                        abstract: "awesome dude",
                        season: 1,
                        status: "finished"
                    }
                ],
                seriesSelection: null,
                seriesTitle: null,
                season: null,
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
                    this.$store.commit("finishSearchRequest")
                }
            }
        },
        methods: {
            finishRequest: function () {
                this.$store.commit("selectSeries", this.seriesSelection);
                this.$store.commit("finishSearchRequest")
            }
        }
    }
</script>

<style scoped>

</style>
