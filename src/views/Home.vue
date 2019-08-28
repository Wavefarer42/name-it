<template>
<v-container>
  <v-row align="stretch">
    <v-col sm="6" xs="12">
      <EpisodeList></EpisodeList>
    </v-col>
    <v-col sm="6" xs="12">
      <FileList></FileList>
    </v-col>
  </v-row>
  <v-row>

  </v-row>
</v-container>
</template>

<script>
    import EpisodeList from "../components/EpisodeList";
    import FileList from "../components/FileList";
    export default {
        name: "Home",
        components: {FileList, EpisodeList}
    }
</script>

<style scoped>

</style>
