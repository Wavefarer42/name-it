<template>
    <v-dialog v-model="openSettings" width="75%" max-width="75%">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Settings
            </v-card-title>
            <v-container>
                <span class="title">Language</span>
                <v-row>
                    <v-col cols="4">
                        <v-combobox v-model="languageSelection"
                                    :items="languages"
                                    item-text="name"
                                    item-value="code"
                                    label="Select"
                                    persistent-hint
                                    allow-overflow
                                    single-line></v-combobox>
                    </v-col>
                </v-row>
                <span class="title">Renaming Format</span>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="format"
                                      :label="helpEpisodeRenamed"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        Examples
                        <v-list dense>
                            <v-list-item-group v-model="format" color="primary">

                                <v-list-item v-for="it in examples"
                                             :key="it.format"
                                             :value="it.format"
                                             @click="format = it.format">
                                    <template v-slot:default="{active}">

                                        <v-list-item-content>
                                            <v-list-item-title>{{it.renamed}}</v-list-item-title>
                                            <v-list-item-subtitle>{{it.format}}</v-list-item-subtitle>
                                        </v-list-item-content>

                                    </template>
                                </v-list-item>

                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>

                <span class="title">Character Blacklist</span>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="blacklist"
                                      label="Comma separated list of characters that are removed from the file name"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="$store.commit('setSettings', false)" text>
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import EpisodeService from "../assets/EpisodeService";
    export default {

        name: "SettingsPopup",
        data: function () {
            return {
                selectedFormat: null,
                formatExamples: [
                    "{e00} - {series} - {episode} - {S00}{E00}",
                    "{series} - {S00}{E00} - {episode}",
                    "{series} - {s0}x{e0} - {episode}",
                    "{e000} - {series} - {episode}",
                ],
                helpEpisode: {
                    "id": 1,
                    "episodeTitle": "Winter Is Coming",
                    "episodeNumber": 1,
                    "seasonNumber": 1,
                    "seriesTitle": "Game of Thrones",
                    "date": "2011-4-17",
                },
                helpEpisodeBroken: {
                    "id": 1,
                    "episodeTitle": "Winter Is Coming?",
                    "episodeNumber": 1,
                    "seasonNumber": 1,
                    "seriesTitle": "Game of Thrones",
                    "date": "2011-4-17",
                },
                languages: [
                    {name: "English", code: "en"},
                    {name: "German", code: "de"},
                    {name: "Spanish", code: "es"},
                    {name: "Japanese", code: "ja"},
                ]
            }
        },
        computed: {
            openSettings: {
                get: function () {
                    return this.$store.state.settings
                },
                set: function (value) {
                    this.$store.commit("setSettings", value)
                }
            },
            format: {
                get: function () {
                    return this.$store.state.nameFormat
                },
                set: function (value) {
                    this.$store.commit("setNameFormat", value)
                }
            },
            blacklist: {
                get: function () {
                    return this.$store.state.blacklist
                },
                set: function (value) {
                    this.$store.commit("setBlacklist", value)
                }
            },
            helpEpisodeRenamed: function () {
                return EpisodeService.formatEpisodeName(this.helpEpisode, this.format, this.$store.state.blacklist)
            },
            languageSelection: {
                get: function () {
                    return this.$store.state.language
                },
                set: function (value) {
                    this.$store.commit("setLanguage", value)
                }
            },
            examples: function () {
                return this.formatExamples.map(it => {
                    return {
                        format: it,
                        renamed: EpisodeService.formatEpisodeName(this.helpEpisode, it, this.$store.state.blacklist)
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>
