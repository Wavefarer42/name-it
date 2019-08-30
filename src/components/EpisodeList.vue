<template>
  <v-card class="mx-auto" tile>

    <v-toolbar flat>
      <v-subheader>Episodes</v-subheader>
      <v-spacer></v-spacer>
      <v-btn class="mx-1" @click="$store.commit('setSearchRequest', true)"
             :loading="$store.state.loadingEpisodes"
             icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-chip class="mx-1" :color="chipColor" outlined>{{episodes.length}}</v-chip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list shaped :dense="$store.state.denseLists">
      <v-list-item v-for="(it, i) in episodes"
                   :key="it.id"
                   class="pr-0 my-1">

        <v-list-item-action class="mr-2 my-0">
          <v-btn icon @click="removeElement(it.id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-divider vertical></v-divider>

        <v-list-item-group v-model="selectedItem" color="primary" style="width: 100%">
          <v-list-item :value="i">
            <template v-slot:default="{active}">
              <v-list-item-content>
                <v-list-item-title>{{it.episodeNumber}}. {{it.title}}</v-list-item-title>
                <v-list-item-subtitle v-if="active">aired on {{it.date}}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>

      </v-list-item>
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
            }
        },
        computed: {
            episodes: {
                get: function () {
                    return this.$store.state.episodes
                },
                set: function (val) {
                    this.$store.commit("setEpisodes", val)
                }
            },
            files: function () {
                return this.$store.state.files
            },
            chipColor: function () {
                if (this.episodes.length === 0) {
                    return "grey"
                } else if (this.files.length > 0 && this.episodes.length > 0 && this.files.length !== this.episodes.length) {
                    return "red"
                } else {
                    return "primary"
                }
            },
            selectedItem: {
                get: function () {
                    return this.$store.state.selectedItem
                },
                set: function (val) {
                    this.$store.commit("setSelectedItem", val)
                }
            }
        },
        methods: {
            clearEpisodes: function () {
                this.$store.commit("selectSeries", null);
                this.episodes = []
            },
            removeElement: function (id) {
                this.episodes = this.episodes.filter(it => it.id !== id)
            }
        }
    }
</script>

<style scoped>

</style>
