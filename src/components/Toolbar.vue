<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-black">name</span>
      <span class="font-weight-light">it</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>


    <v-btn class="mx-1" icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn class="mx-1" @click="coffee" icon>
      <v-icon>mdi-coffee</v-icon>
    </v-btn>
    <v-btn class="mx-1"
           @click="$store.commit('setSettings', true)"
           :color="settings"
           icon>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
    export default {
        name: "Toolbar",
        computed: {
            settings: function () {
                if (this.$store.state.settings) {
                    return "primary"
                } else {
                    return null
                }
            }
        },
        methods: {
            coffee: function () {
                const open = require("open");

                (async () => {
                    await open("https://paypal.me/HannesThaller")
                })()
            }
        }
    }
</script>

<style scoped>

</style>
