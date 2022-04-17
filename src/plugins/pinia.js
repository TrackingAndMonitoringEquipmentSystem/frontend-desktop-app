import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
Vue.use(PiniaVuePlugin);
export default createPinia();
