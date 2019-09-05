<template>
  <v-container fluid class="pb-0">
    <v-row justify="center" align="center" class="mb-5">
      <v-col xs="12" sm="10" md="8" lg="6">
        <v-img src="/splash.png"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" class="text-center">
        <h1>File naming. Simplified.</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" class="text-center">
        <h3>Free, open-source, multi-platform, file naming app.</h3>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="mb-5">
      <v-col lg="2" md="4" sm="4" xs="12">
        <Downloader></Downloader>
      </v-col>
      <v-col lg="6" md="8" sm="8" xs="12">
        <v-card elevation="3">
          <v-img src="/name-it-screen.png"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="py-5 blue lighten-5">
      <v-col lg="6" md="8" sm="8" xs="12">
        <v-card>
          <v-img src="name-it-1.png"></v-img>
        </v-card>
      </v-col>
      <v-col lg="2" md="4" sm="4" xs="12">
        <v-card color="blue" dark>
          <v-card-title>Search</v-card-title>
          <v-card-text class="subtitle-1">
            Search and load series and episode names from TVDB.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="py-5 green lighten-5">
      <v-col lg="2" md="4" sm="4" xs="12">
        <v-card color="green" dark>
          <v-card-title>Rename</v-card-title>
          <v-card-text class="subtitle-1">
              Load, order, and rename your files.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="6" md="8" sm="8" xs="12">
        <v-card>
          <v-img src="name-it-3.png"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class="pt-5 purple lighten-5">
      <v-col lg="6" md="8" sm="8" xs="12">
        <v-card>
          <v-img src="name-it-2.png"></v-img>
        </v-card>
      </v-col>

      <v-col lg="2" md="4" sm="4" xs="12">
        <v-card color="purple" dark>
          <v-card-title>Configure</v-card-title>
          <v-card-text class="subtitle-1">
            Adapt your naming format.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>
    import Downloader from "../components/Downloader";
    export default {
        components: {Downloader},
        data: function () {
            return {}
        }
    }
</script>
