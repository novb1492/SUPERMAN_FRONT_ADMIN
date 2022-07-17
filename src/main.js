import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import {kmapStore} from './store/kmapStore';
import {NavStore  } from "./store/NavStore";
import { basicStore } from "./store/basicStore";
import '@/assets/css/swiper.min.css'
const app = createApp(App);
app.use(router);
app.use(Vuex);
app.use(kmapStore);
app.use(NavStore);
app.use(basicStore);
app.mount('#app');
