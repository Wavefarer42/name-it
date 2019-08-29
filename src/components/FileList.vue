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
      <v-chip class="mx-1" color="primary" outlined>{{files.length}}</v-chip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list v-sortable-list @sorted="sortHandler" shaped>
      <v-list-item v-for="it in files"
                   :key="it.path"
                   class="pr-0">

        <v-list-item-action class="mr-2">
          <v-icon style="cursor: row-resize" class="sortHandle">mdi-drag-horizontal</v-icon>
        </v-list-item-action>


        <v-list-item-group v-model="selectedItem" color="primary" style="width: 100%">
          <v-list-item :value="it.path">
            <template v-slot:default="{active, toggle}">
              <v-list-item-content>
                <v-list-item-title v-text="it.name"></v-list-item-title>
                <v-list-item-subtitle v-if="active" v-text="it.path"
                                      class="d-inline-block text-truncate"
                                      style="max-width: 300px"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="active">filetype: {{it.extension}}</v-list-item-subtitle>
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
      <v-btn :disabled="files.length === 0"
             text outlined>
        rename
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    const {dialog} = require('electron').remote;
    const path = require('path');

    export default {
        name: "FileList",
        data: function () {
            return {
                selectedItem: null,
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
            }
        },
        methods: {
            openFiles: function () {
                this.selectionInProgress = true;
                dialog.showOpenDialog({
                    properties: ["openFile", "multiSelections"],
                    filters: [
                        {name: "Video", extensions: ["mkv", "avi", "mp4", "mpg", "mpeg"]},
                        {name: "All Files", extensions: ["*"]}
                    ]
                }).then(result => {
                    if (result.filePaths.length > 0) {
                        this.files = result.filePaths.map(it => {
                            const extension = path.extname(it);
                            return {
                                "name": path.basename(it, extension),
                                "path": it,
                                "extension": extension
                            }
                        })
                    }
                }).finally(() => this.selectionInProgress = false)
            },
            sortHandler: function ({oldIndex, newIndex}) {
                const moved = this.files.splice(oldIndex, 1)[0];
                this.files.splice(newIndex, 0, moved);
            },
            selectFile: function (path) {
                return function () {
                    this.selectFile = path
                }
            }
        }
    }
</script>

<style scoped>
</style>
