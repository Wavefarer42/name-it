<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-black">name</span>
      <span class="font-weight-light">it</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-coffee</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
    export default {
        name: "Toolbar"
    }
</script>

<style scoped>

</style>
