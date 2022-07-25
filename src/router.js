import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HelloWorld.vue";
import loginPage from "@/views/loginPage.vue";
import RegiStorePage from "@/views/RegiStorePage.vue";

const routes = [
  {path: "/",component: Home},
  {path:"/login",component:loginPage},
  {path:"/regi-store",component:RegiStorePage}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;