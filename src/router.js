import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/HelloWorld.vue";
import loginPage from "./components/loginPage.vue";

const routes = [
  {path: "/",component: Home},
  {path:"/login",component:loginPage}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;