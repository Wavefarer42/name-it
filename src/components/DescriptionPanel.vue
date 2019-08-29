<template>
  <v-card>
    <v-card-title class="display-2">
      {{series.title}}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <span class="overline mr-1">aired on</span> {{series.airdate}}
        </v-col>
        <v-col cols="4">
          <span class="overline mr-1">status</span> {{series.status}}
        </v-col>
        <v-col cols="4">
          <span class="overline mr-1">seasons</span> {{series.season}}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      {{series.abstract}}
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
        name: "DescriptionPanel",
        props: ["series"],

    }
</script>

<style scoped>

</style>
