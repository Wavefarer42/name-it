<template>
  <v-container>
    <SeriesSelector></SeriesSelector>
    <v-row v-if="series">
      <v-col cols="12">
        <DescriptionPanel :series="series"></DescriptionPanel>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col sm="6" xs="12">
        <EpisodeList></EpisodeList>
      </v-col>
      <v-col sm="6" xs="12">
        <FileList></FileList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import EpisodeList from "../components/EpisodeList";
    import FileList from "../components/FileList";
    import SeriesSelector from "../components/SeriesSelector";
    import DescriptionPanel from "../components/DescriptionPanel";

    export default {
        name: "Home",
        components: {DescriptionPanel, SeriesSelector, FileList, EpisodeList},
        computed:{
            series:function(){
                return this.$store.state.selectedSeries
            }
        }
    }
</script>

<style scoped>

</style>
