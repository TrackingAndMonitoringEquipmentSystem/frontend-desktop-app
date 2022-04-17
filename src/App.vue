<template>
  <div id="app">
    <v-app>
      <v-app-bar elevation="4" color="white" max-height="60">
        <v-toolbar-title
          ><v-img
            contain
            src="assets/logo.png"
            max-width="136"
            max-height="32"
          ></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn> วิธีการลงทะเบียน </v-btn> -->
      </v-app-bar>
      <router-view />
      <v-overlay :value="loadingStore.isLoading">
        <v-progress-circular
          :size="100"
          color="purple darken-4"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-app>
  </div>
</template>

<script>
import { loadingStore } from "./stores/loading";
export default {
  name: "App",
  data() {
    return {
      loadingStore: loadingStore(),
    };
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>

