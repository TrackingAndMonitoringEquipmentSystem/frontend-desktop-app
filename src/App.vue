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
      <v-dialog v-model="popupStore.isShow" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ popupStore.title }}
          </v-card-title>

          <v-card-text>
            {{ popupStore.message }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="popupStore.onBackPreesed"
              color="primary"
              text
              @click="popupStore.onBackPreesed()"
            >
              ย้อนกลับ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import { loadingStore } from "./stores/loading";
import { popupStore } from "./stores/popupStore";
export default {
  name: "App",
  data() {
    return {
      loadingStore: loadingStore(),
      popupStore: popupStore(),
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

