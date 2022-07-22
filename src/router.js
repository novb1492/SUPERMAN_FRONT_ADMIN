import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/HelloWorld.vue";
import loginPage from "./views/loginPage.vue";

const routes = [
  {path: "/",component: Home},
  {path:"/login",component:loginPage}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;