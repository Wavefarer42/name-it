<template>
<v-container>
  <v-row>
    <v-col>
      <EpisodeList></EpisodeList>
    </v-col>
    <v-col>
      <FileList></FileList>
    </v-col>
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
