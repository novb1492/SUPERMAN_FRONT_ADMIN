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
import CompanyListPage from "@/views/company/CompanyListPage.vue";
import OrderListPage from "@/views/order/OrderListPage.vue";
import OrderDetailPage from "@/views/order/OrderDetailPage.vue";

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
      checkLogin('/login', '/store-list*page='+getParam('page')+'^category='+getParam('category')+'^keyword='+getParam('keyword'), 'USER');
    }
  },
  {
    path: "/store-detail",
    component: StoreDetailPage,
    beforeEnter: () => {
      checkLogin('/login', '/store-detail*id='+getParam('id')+ '^storeName=' + getParam('storeName') + '^addr=' + getParam('addr'), 'USER');
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
      checkLogin('/login', '/product-list*page='+getParam('page')+'^category='+category+'^storeid='+getParam('storeid')+ '^storeName=' + getParam('storeName') + '^addr=' + getParam('addr'), 'USER');
    }
  },
  {
    path: "/company-list",
    component: CompanyListPage,
    beforeEnter: () => {
      checkLogin('/login', '/company-list?page='+getParam('page')+'^category='+getParam('category')+'^keyword='+getParam('keyword'), 'ADMIN');
    }
  },
  {
    path: "/order-list",
    component: OrderListPage,
    beforeEnter: () => {
      checkLogin('/login', '/order-list*state='+getParam('state')+'^page='+getParam('page')+'^category='+getParam('category')+'^storeid='+getParam('storeid')+ '^storeName=' + getParam('storeName') + '^addr=' + getParam('addr')+'^periodFlag='+getParam('periodFlag'), 'USER');
    }
  },
  {
    path: "/order-detail",
    component: OrderDetailPage,
    beforeEnter: () => {
      checkLogin('/login', '/order-detail*paymentid='+getParam('cardId')+'^page='+getParam('page')+'^storeid='+getParam('storeid')+'^storeName='+getParam('storeName')+'^addr='+getParam('addr')+'^periodFlag='+getParam('periodFlag'), 'USER');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;