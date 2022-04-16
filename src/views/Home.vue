<template>
  <v-container fill-height>
    <v-card width="100%" height="100%">
      <v-row justify="center" class="fill-height">
        <v-col class="mt-16 display-1">
          <div v-if="isUnregister">
            <v-row justify="center" class="ma-5"
              ><span>สถานะ :&nbsp;</span><span> ยังไม่ได้ลงทะเบียน</span></v-row
            >
            <v-row justify="center" class="ma-5"
              ><span>LockerId :&nbsp;</span><span>{{ lockerId }}</span></v-row
            >
            <v-row justify="center" class="ma-5">
              <QRCode :text="lockerId"></QRCode>
            </v-row>
          </div>
          <div v-else>
            <v-col>
              <v-row>
                <h5>ข้อมูลรายละเอียด</h5>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <span>ชื่อตู้ล็อกเกอร์ :</span>
                </v-col>
                <v-col>
                  <span>{{ name }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>คำอธิบาย :</span>
                </v-col>
                <v-col>
                  <span>{{ description }}</span>
                </v-col>
              </v-row>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import VueQRCodeComponent from "vue-qrcode-component";
import io from "socket.io-client";
import axios from "axios";

export default {
  name: "Home",
  components: {
    QRCode: VueQRCodeComponent,
  },
  data() {
    return {
      socket: null,
      isRunningFaceRecognition: false,
      locker: null,
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    axios
      .get(
        `${process.env.VUE_APP_SOCKET_URL}:${process.env.VUE_APP_SOCKET_PORT}/${process.env.VUE_APP_LOCKER_GET_PATH}`
      )
      .then((response) => {
        this.isLoading = false;
        const locker = response.data.data;
        this.locker = locker;
      })
      .catch(console.log);
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
    this.socket.on("locker_updated", (locker) => {
      console.log("->locker_updated:", locker);
      this.locker = locker;
    });
    this.socket.on("faceRecognitionResult", (result) => {
      console.log("->result:", result);
    });
    this.se;
  },
  computed: {
    name() {
      return this.locker?.name ?? "";
    },
    displayToggleFaceRecognitionText() {
      return !this.isRunningFaceRecognition ? "start" : "stop";
    },
    isUnregister() {
      return this.locker?.status == "unregister";
    },
    lockerId() {
      return this.locker?.id.toString() ?? "";
    },
    description() {
      return this.locker?.description ?? "";
    },
  },
  methods: {
    setRunRecognition(state) {
      if (state) {
        this.socket.emit("startFaceRecognition");
      } else {
        this.socket.emit("stopFaceRecognition");
      }
      this.isRunningFaceRecognition = state;
    },
  },
};
</script>

<style scoped>
</style>
