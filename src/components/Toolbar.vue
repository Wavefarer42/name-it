<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-black">name</span>
      <span class="font-weight-light">it</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>


    <v-menu>
      <template v-slot:activator="{on}">
        <v-btn class="mx-1" v-on="on" icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="it in sharepoints"
                     :key="it.name"
                     @click="openExternal(it.link)">
          <v-list-item-avatar>
            <v-icon>{{it.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{it.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


    <v-btn class="mx-1" @click="openExternal('https://paypal.me/HannesThaller')" icon>
      <v-icon>mdi-coffee</v-icon>
    </v-btn>
    <v-btn class="mx-1"
           @click="$store.commit('setSettings', true)"
           :color="settings"
           icon>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
    import open from "open"

    export default {
        name: "Toolbar",
        data: function () {
            return {
                sharepoints: [
                    {
                        name: "Facebook",
                        icon: "mdi-facebook",
                        link: "https://www.facebook.com/sharer/sharer.php?u=https%3A//tallic.github.io/name-it/"
                    },
                    {
                        name: "Twitter",
                        icon: "mdi-twitter",
                        link: "https://twitter.com/intent/tweet?text=Wow, check out NAMEIT - tallic.github.io/name-it/"
                    }
                ]
            }
        },
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
            openExternal: function (link) {
                (async () => {
                    await open(link)
                })()
            }
        }
    }
</script>

<style scoped>

</style>
