import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HelloWorld.vue";
import loginPage from "@/views/loginPage.vue";
import RegiStorePage from "@/views/RegiStorePage.vue";
import MyPage from "@/views/MyPage.vue";
import { checkLogin } from "./assets/js/Jslib";
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: loginPage
  },
  {
    path: "/regi-store",
    component: RegiStorePage,
    beforeEnter: () => {
      checkLogin('/login', '/regi-store','ADMIN');
    }
  },
  {
    path: "/mypage",
    component: MyPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;