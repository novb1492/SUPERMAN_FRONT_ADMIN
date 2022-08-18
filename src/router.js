import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HelloWorld.vue";
import loginPage from "@/views/loginPage.vue";
import RegiStorePage from "@/views/RegiStorePage.vue";
import MyPage from "@/views/MyPage.vue";
import { checkLogin, checkParam, getParam } from "@/assets/js/Jslib";
import RegiEmplPage from "@/views/employee/RegiEmplPage.vue";
import StoreListPage from "@/views/store/StoreListPage.vue";
import StoreDetailPage from "@/views/store/StoreDetailPage.vue";
import RegiCompanyPage from "@/views/company/RegiCompanyPage.vue";
import RegiProductPage from "@/views/product/RegiProductPage.vue";
import ProductListPage from "@/views/product/ProductListPage.vue";
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
      checkLogin('/login', '/regi-employee*page='+getParam('page'), 'MANAGE');
    }
  },
  {
    path: "/store-list",
    component: StoreListPage,
    beforeEnter: () => {
      checkLogin('/login', '/store-list*page=1^category='+getParam('category')+'^keyword='+getParam('keyword'), 'USER');
    }
  },
  {
    path: "/store-detail",
    component: StoreDetailPage,
    beforeEnter: () => {
      checkLogin('/login', '/store-detail*id='+getParam('id'), 'USER');
    }
  },
  {
    path: "/regi-companynum",
    component: RegiCompanyPage,
    beforeEnter: () => {
      checkLogin('/login', '/regi-companynum', 'ADMIN');
    }
  },
  {
    path: "/regi-product",
    component: RegiProductPage,
    beforeEnter: () => {
      checkLogin('/login', '/regi-product*storeid='+getParam('storeid'), 'MANGE');
    }
  },
  {
    path: "/product-list",
    component: ProductListPage,
    beforeEnter: () => {
      let category=getParam('category');
      if(checkParam(category)){
        category='0';
      }
      checkLogin('/login', '/product-list*page=1^category='+category+'^storeid='+getParam('storeid'), 'USER');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;