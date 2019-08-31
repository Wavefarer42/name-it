<template>
  <v-app>
    <Toolbar></Toolbar>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
    import Toolbar from "./components/Toolbar";
    import Home from "./views/Home"
    import Store from "electron-store"


    export default {
        name: 'App',
        data: function () {
            return {
                electronStore: new Store()
            }
        },
        components: {
            Home,
            Toolbar,
        },
        computed: {
            nameFormat: {
                get() {
                    return this.$store.state.nameFormat
                },
                set(value) {
                    this.$store.commit("setNameFormat", value);
                }
            },
            language: {
                get() {
                    return this.$store.state.language
                },
                set(value) {
                    this.$store.commit("setLanguage", value)
                }
            }
        },
        created() {
            this.setupDefaults(this.electronStore);

            this.$store.commit("setNameFormat", this.electronStore.get("nameFormat"));
            this.$store.commit("setLanguage", this.electronStore.get("language"))
        },
        methods: {
            setupDefaults: function (store) {
                if (!store.has("nameFormat")) {
                    store.set("nameFormat", "{e00} - {series} - {episode} - {S00}{E00}")
                }
                if (!store.has("language")) {
                    store.set("language", {name: "English", code: "en"})
                }
            }
        },
        watch: {
            nameFormat: function (value) {
                this.electronStore.set("nameFormat", value)
            },
            language: function (value) {
                this.electronStore.set("language", value)
            }
        }
    };
</script>

<style>
  html {
    overflow-y: auto !important;
  }
</style>
