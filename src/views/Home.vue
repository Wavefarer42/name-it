<template>
  <v-container>
    <SeriesSelector></SeriesSelector>
    <SettingsPopup></SettingsPopup>
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
    import SearchPopup from "../components/SearchPopup";
    import DescriptionPanel from "../components/DescriptionPanel";
    import SettingsPopup from "../components/SettingsPopup";

    export default {
        name: "Home",
        components: {SettingsPopup, DescriptionPanel, SeriesSelector: SearchPopup, FileList, EpisodeList},
        computed: {
            series: function () {
                return this.$store.state.selectedSeries
            }
        },
    }
</script>

<style scoped>

</style>
