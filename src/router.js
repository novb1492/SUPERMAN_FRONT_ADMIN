import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HelloWorld.vue";
import loginPage from "@/views/loginPage.vue";
import RegiStorePage from "@/views/RegiStorePage.vue";
import MyPage from "@/views/MyPage.vue";
import { checkLogin } from "@/assets/js/Jslib";
import RegiEmplPage from "@/views/employee/RegiEmplPage.vue";
import StoreListPage from "@/views/store/StoreListPage.vue";
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
      checkLogin('/login', '/regi-store', 'ADMIN');
    }
  },
  {
    path: "/mypage",
    component: MyPage,
    beforeEnter: () => {
      checkLogin('/login', '/mypage', 'USER');
    }
  },
  {
    path: "/regi-employee",
    component: RegiEmplPage,
    beforeEnter: () => {
      checkLogin('/login', '/regi-employee', 'MANAGE');
    }
  },
  {
    path: "/store-list",
    component: StoreListPage,
    beforeEnter: () => {
      checkLogin('/login', '/store-list', 'USER');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;