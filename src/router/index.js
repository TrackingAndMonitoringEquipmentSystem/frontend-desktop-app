import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FaceRecognition from "../views/FaceRecognition.vue";
import UnlockLocker from "../views/UnlockLocker";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/face-recognition",
    name: "FaceRecognition",
    component: FaceRecognition,
  },
  {
    path: "/unlock-locker",
    name: "UnlockLocker",
    component: UnlockLocker,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
