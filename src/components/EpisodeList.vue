<template>
  <v-card class="mx-auto scroll" tile>

    <v-toolbar flat>
      <v-subheader>Episodes</v-subheader>
      <v-spacer></v-spacer>
      <v-btn :color="previewColor"
             @click="preview = !preview"
             class="mx-1" icon>
        <v-icon>mdi-set-center-right</v-icon>
      </v-btn>
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
                <span v-if="preview">{{formatEpisodeName(it)}}</span>
                <span v-else>{{it.episodeNumber}}. {{it.episodeTitle}}</span>
                <span class="grey--text caption" v-if="active">aired on {{it.date}}</span>
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
    import EpisodeService from "../assets/EpisodeService";

    export default {
        name: "EpisodeList",
        data: function () {
            return {
                preview: false
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
            },
            previewColor: function () {
                if (this.preview) {
                    return "primary"
                } else {
                    return null
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
            },
            formatEpisodeName: function (episode) {
                return EpisodeService.formatEpisodeName(episode, this.$store.state.nameFormat)
            }
        }
    }
</script>

<style scoped>

</style>
