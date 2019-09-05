<template>
  <v-card>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="it in downloadLinks"
                     :key="it.extension"
                     two-line>
          <v-list-item-icon>
            <v-icon>{{it.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{it.extension}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{it.system}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
    export default {
        name: "Downloader",
        data:function(){
            return {
                downloadLinks: [
                    {
                        extension: ".AppImage",
                        system: "Linux",
                        icon: "mdi-linux"
                    },
                    {
                        extension: ".exe",
                        system: "Windows x64",
                        icon: "mdi-windows"
                    },
                    {
                        extension: ".dmg",
                        system: "macOS",
                        icon: "mdi-apple"
                    },
                    {
                        extension: ".deb",
                        system: "Debian, Ubuntu, ...",
                        icon: "mdi-ubuntu"
                    },
                    {
                        extension: ".rpm",
                        system: "Red Hat, Fedora, ...",
                        icon: "mdi-fedora"
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
