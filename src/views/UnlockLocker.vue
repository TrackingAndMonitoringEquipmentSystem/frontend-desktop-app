<template>
  <v-container fill-height>
    <v-card width="100%" height="100%">
      <v-row justify="center" class="fill-height">
        <v-col class="mt-16 display-1">
          <div class="fill-height">
            <v-col class="fill-height">
              <v-row class="ma-10" justify="center">
                <v-btn v-if="isLock" @click="unlock()">กดเพื่อปลดล็อคตู้</v-btn>
                <v-btn v-else @click="lock()">กดเพื่อล็อคตู้</v-btn>
              </v-row>
              <v-row class="ma-10" justify="center">
                <v-btn @click="borrow()">กดเพื่อยืมอุปกรณ์</v-btn>
              </v-row>
              <v-row class="ma-10" justify="center">
                <v-btn @click="_return()">กดเพื่อคืนอุปกรณ์</v-btn>
              </v-row>
              <v-row class="ma-10" justify="center">
                <v-btn @click="backHome()">กลับหน้าหลัก</v-btn>
              </v-row>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import { userStore } from "../stores/userStore";
export default {
  name: "UnlockLocker",
  data() {
    return {
      socket: null,
      isLock: true,
      userStore: userStore(),
    };
  },
  mounted() {
    this.socket = io(
      `${process.env.VUE_APP_SOCKET_URL}:${process.env.VUE_APP_SOCKET_PORT}`
    );
    this.socket.on("connect", () => {
      console.log("connected");
    });
    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });
    this.socket.on("connect_error", (error) => {
      console.log("connect_error:", error);
    });
    this.socket.on("logStateChanged", (data) => {
      this.isLock = data;
    });
  },
  methods: {
    unlock() {
      this.socket.emit("unlock");
      this.isLock = false;
    },
    lock() {
      this.socket.emit("lock");
      this.isLock = true;
    },
    backHome() {
      this.$router.replace({ path: "/" });
    },
    borrow() {
      this.socket.emit("borrow", this.userStore.userId);
    },
    _return() {
      this.socket.emit("return", this.userStore.userId);
    },
  },
};
</script>
