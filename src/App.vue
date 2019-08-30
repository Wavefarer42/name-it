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

    export default {
        name: 'App',
        components: {
            Home,
            Toolbar,
        },
    };
</script>
