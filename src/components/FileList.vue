<template>
  <v-card class="mx-auto" tile>
    <v-toolbar flat>
      <v-subheader>Files</v-subheader>
      <v-spacer></v-spacer>

      <v-btn @click="openFiles"
             :loading="selectionInProgress"
             :disabled="selectionInProgress"
             class="mx-1" icon>
        <v-icon>mdi-folder</v-icon>
      </v-btn>
      <v-chip class="mx-1" :color="chipColor" outlined>{{files.length}}</v-chip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list v-sortable-list @sorted="sortHandler"
            :dense="$store.state.denseLists"
            shaped>
      <v-list-item v-for="(it, i) in files"
                   :key="it.path"
                   class="pr-0 my-1">

        <v-list-item-action class="mr-2 my-0">
          <v-icon style="cursor: row-resize" class="sortHandle">mdi-drag-horizontal</v-icon>
        </v-list-item-action>

        <v-divider vertical></v-divider>

        <v-list-item-group v-model="selectedItem" color="primary" style="width: 100%">
          <v-list-item :value="i">
            <template v-slot:default="{active}">
              <v-list-item-content>
                <span :class="{'grey--text':ignoredFile(i)}">{{it.name}}</span>
                <span v-if="ignoredFile(i)" class="grey--text overline">ignored during renaming
                </span>
                <span v-if="active" class="grey--text caption">{{it.path}}</span>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>

      </v-list-item>
    </v-list>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn @click="files = []" :disabled="files.length === 0" text outlined>
        clear
      </v-btn>
      <v-btn :disabled="files.length === 0 || episodes.length === 0"
             @click="rename"
             color="primary"
             text outlined>
        rename
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import FileService from "../assets/FileService";
    import EpisodeService from "../assets/EpisodeService";

    export default {
        name: "FileList",
        data: function () {
            return {
                renamingInProgress: false,
                selectionInProgress: false,
            }
        },
        computed: {
            files: {
                get: function () {
                    return this.$store.state.files
                },
                set: function (val) {
                    this.$store.commit("setFiles", val)
                }
            },
            episodes: function () {
                return this.$store.state.episodes
            },
            chipColor: function () {
                if (this.files.length === 0) {
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
        },
        methods: {
            openFiles: function () {
                this.selectionInProgress = true;
                FileService.loadFiles()
                    .then(it => {
                        if (it.length > 0) {
                            this.files = it
                        }
                    })
                    .finally(() => this.selectionInProgress = false)
            },
            rename: function () {
                this.renamingInProgress = true;
                const names = this.$store.state.episodes.map(it => EpisodeService.formatEpisodeName(it, this.$store.state.nameFormat))
                FileService.renameFiles(this.$store.state.files, names)
                    .then(newFiles => {
                        this.files = newFiles;
                        this.$store.dispatch("notifyUser", {msg: "Finished renaming", color: "success"});
                    })
                    .catch(it => {
                        this.$store.dispatch("notifyUser", {
                            msg: "Something wen't wrong during renaming :/",
                            color: "error"
                        });
                    })
                    .finally(() => this.renamingInProgress = false)
            },
            sortHandler: function ({oldIndex, newIndex}) {
                const moved = this.files.splice(oldIndex, 1)[0];
                this.files.splice(newIndex, 0, moved);
            },
            selectFile: function (path) {
                return function () {
                    this.selectFile = path
                }
            },
            ignoredFile: function (i) {
                return this.episodes.length > 0 && i + 1 > this.episodes.length
            },
        }
    }
</script>

<style scoped>

</style>
