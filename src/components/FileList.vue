<template>
  <v-card class="mx-auto"
          min-height="300"
          tile>


    <v-toolbar flat>
      <v-subheader>Files</v-subheader>
      <v-spacer></v-spacer>
      <v-chip v-if="files" color="primary" outlined>{{files.length}}</v-chip>
      <v-chip v-else outlined>0</v-chip>
    </v-toolbar>

    <v-divider :inset="inset"></v-divider>

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
