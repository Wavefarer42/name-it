<template>
  <v-card class="mx-auto" tile>

    <v-toolbar flat>
      <v-subheader>Episodes</v-subheader>
      <v-spacer></v-spacer>
      <v-btn class="mx-1" @click="$store.commit('issueSearchRequest')" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-chip v-if="episodes" class="mx-1" color="primary" outlined>{{episodes.length}}</v-chip>
      <v-chip v-else class="mx-1" outlined>0</v-chip>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list shaped>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(it, i) in episodes" :key="i">
          <template v-slot:default="{active}">
            <v-list-item-content>
              <v-list-item-title v-text="it.name"></v-list-item-title>
              <v-list-item-subtitle v-if="active">episode #{{it.episodeNumber}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="active">aired on {{it.date}}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn :disabled="episodes.length === 0"
             @click="clearEpisodes"
             text outlined>
        clear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "EpisodeList",
        data: function () {
            return {
                searchRequest: false,
                selectedItem: 1,
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
            }
        },
        methods: {
            clearEpisodes: function () {
                this.$store.commit("selectSeries", null);
                this.episodes = []
            }
        }
    }
</script>

<style scoped>

</style>
