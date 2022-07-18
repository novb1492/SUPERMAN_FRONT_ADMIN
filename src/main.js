import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import {stores} from './index';

import '@/assets/css/swiper.min.css'
const app = createApp(App);
app.use(router);
app.use(Vuex);
app.use(stores);
app.mount('#app');
