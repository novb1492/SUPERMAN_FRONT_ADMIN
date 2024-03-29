import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HelloWorld.vue";
import loginPage from "@/views/loginPage.vue";
import RegiStorePage from "@/views/RegiStorePage.vue";
import MyPage from "@/views/MyPage.vue";
import { checkLogin, checkParam, getParam, storeCommonQueryInRouter } from "@/assets/js/Jslib";
import RegiEmplPage from "@/views/employee/RegiEmplPage.vue";
import StoreListPage from "@/views/store/StoreListPage.vue";
import StoreDetailPage from "@/views/store/StoreDetailPage.vue";
import RegiCompanyPage from "@/views/company/RegiCompanyPage.vue";
import RegiProductPage from "@/views/product/RegiProductPage.vue";
import ProductListPage from "@/views/product/ProductListPage.vue";
import CompanyListPage from "@/views/company/CompanyListPage.vue";
import OrderListPage from "@/views/order/OrderListPage.vue";
import OrderDetailPage from "@/views/order/OrderDetailPage.vue";
import DeliverListPage from "@/views/deliver/DeliverListPage.vue";
import DeliverDetailPage from "@/views/deliver/DeliverDetailPage.vue";
import SalesListPage from "@/views/sales/SalesListPage.vue";
import EmpListPage from "@/views/employee/EmpListPage.vue";
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
      checkLogin('/login', '/store-detail*storeid='+getParam('storeid')+ '^storeName=' + getParam('storeName') + '^addr=' + getParam('addr'), 'USER');
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
      checkLogin('/login', '/product-list*page='+getParam('page')+'^category='+category+'^val='+getParam('val')+storeCommonQueryInRouter(), 'USER');
    }
  },
  {
    path: "/company-list",
    component: CompanyListPage,
    beforeEnter: () => {
      checkLogin('/login', '/company-list*page='+getParam('page')+'^category='+getParam('category')+'^keyword='+getParam('keyword'), 'ADMIN');
    }
  },
  {
    path: "/order-list",
    component: OrderListPage,
    beforeEnter: () => {
      checkLogin('/login', '/order-list*state='+getParam('state')+'^page='+getParam('page')+'^category='+getParam('category')+'^keyword='+getParam('keyword')+'^periodFlag='+getParam('periodFlag')+storeCommonQueryInRouter(), 'USER');
    }
  },
  {
    path: "/order-detail",
    component: OrderDetailPage,
    beforeEnter: () => {
      checkLogin('/login', '/order-detail*state='+getParam('state')+'^paymentid='+getParam('cardId')+'^page='+getParam('page')+storeCommonQueryInRouter()+'^periodFlag='+getParam('periodFlag'), 'USER');
    }
  },
  {
    path: "/deliver-list",
    component: DeliverListPage,
    beforeEnter: () => {
      checkLogin('/login', '/deliver-list*page='+getParam('page')+'^state='+getParam('state')+storeCommonQueryInRouter(), 'USER');
    }
  },
  {
    path: "/deliver-detail",
    component: DeliverDetailPage,
    beforeEnter: () => {
      checkLogin('/login', '/deliver-detail*deliverid='+getParam('deliverid')+storeCommonQueryInRouter(), 'USER');
    }
  },
  {
    path: "/sales-list",
    component: SalesListPage,
    beforeEnter: () => {
      checkLogin('/login', '/sales-list*year='+getParam('year')+'^month='+getParam('month')+storeCommonQueryInRouter(), 'MANAGE');
    }
  },
  {
    path: "/empl-list",
    component: EmpListPage,
    beforeEnter: () => {
      checkLogin('/login', '/empl-list*page='+getParam('pagee')+storeCommonQueryInRouter(), 'USER');
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;