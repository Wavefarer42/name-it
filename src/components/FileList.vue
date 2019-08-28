<template>
  <v-card class="mx-auto" tile>

    <v-toolbar flat>
      <v-subheader>Files</v-subheader>
      <v-spacer></v-spacer>
      <v-btn class="mx-1" icon>
        <v-icon>mdi-folder</v-icon>
      </v-btn>
      <v-chip v-if="files" class="mx-1" color="primary" outlined>{{files.length}}</v-chip>
      <v-chip v-else class="mx-1" outlined>0</v-chip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list shaped>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(it, i) in files" :key="i">
          <template v-slot:default="{active}">
            <v-list-item-content>
              <v-list-item-title v-text="it.name"></v-list-item-title>
              <v-list-item-subtitle v-if="active" v-text="it.path"></v-list-item-subtitle>
              <v-list-item-subtitle v-if="active">filetype: {{it.extension}}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn :disabled="!files" text outlined>
        rename
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
    export default {
        name: "FileList",
        data: function () {
            return {
                selectedItem: 1,
                files: [
                    {
                        "name": "some name",
                        "path": "/some/paht",
                        "extension": ".mpeg"
                    },
                    {
                        "name": "some pther name",
                        "path": "/other/path",
                        "extension": ".mpeg"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
