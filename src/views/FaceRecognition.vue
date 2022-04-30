<template>
  <v-container fill-height>
    <v-card width="100%" height="100%">
      <v-row justify="center" class="fill-height">
        <v-col class="mt-16 display-1">
          <div class="fill-height">
            <v-col class="fill-height">
              <img
                v-if="isFirstFrameCamed"
                :src="recogImage"
                alt="live recog image"
              />
              <v-progress-circular
                v-else
                :size="100"
                color="purple darken-4"
                indeterminate
              ></v-progress-circular>
              <v-spacer></v-spacer>
              <v-btn @click="stopFaceRecognition()"
                >กดเพื่อหยุดแสกนใบหน้า</v-btn
              >
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
import { popupStore } from "../stores/popupStore";
export default {
  name: "FaceRecognition",
  data() {
    return {
      socket: null,
      isRunningFaceRecognition: false,
      locker: null,
      isLoading: false,
      recogImage: null,
      isFirstFrameCamed: false,
      userStore: userStore(),
      popupStore: popupStore(),
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
    this.socket.on("faceRecognitionResult", (result) => {
      this.isFirstFrameCamed = true;
      if (result.isDetectedFace !== undefined) {
        this.recogImage = `data:image/jpg;base64, ${result.image}`;
      } else if (result.message === "Granted") {
        this.userStore.setUserId(result.userId);
        if (this.$router.name != "UnlockLocker") {
          this.$router.replace({ path: "/unlock-locker" });
        }
      } else {
        this.popupStore.title = "ผลลัพธ์การยืนยันตัวตนด้วยใบหน้า";
        this.popupStore.message = "คุณไม่มีสิทธิ์เข้าถึงการใช้งานล็อคเกอร์";
        this.popupStore.onBackPreesed = (() => {
          this.popupStore.isShow = false;
          this.$router.replace({ path: "/" });
        }).bind(this);
        this.popupStore.isShow = true;
      }
    });
    this.socket.emit("startFaceRecognition");
  },
  methods: {
    stopFaceRecognition() {
      this.socket.emit("stopFaceRecognition");
      this.$router.replace({ path: "/" });
    },
  },
};
</script>
