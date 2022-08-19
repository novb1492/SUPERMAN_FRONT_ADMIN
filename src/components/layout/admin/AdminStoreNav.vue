<template>
    <ShowState></ShowState>
    <OrderNav></OrderNav>
    <DeliverNav></DeliverNav>
    <ProductNav></ProductNav>
    <EmployeeNav></EmployeeNav>
    <SalesNav></SalesNav>
    <StoreInfo></StoreInfo>
</template>

<script>
import OrderNav from '@/components/layout/storeMenu/OrderNav.vue';
import DeliverNav from "@/components/layout/storeMenu/DeliverNav.vue";
import SalesNav from "@/components/layout/storeMenu/SalesNav.vue";
import ShowState from '../ShowState.vue';
import ProductNav from '../storeMenu/ProductNav.vue';
import EmployeeNav from '../mainMenu/EmployeeNav.vue';
import StoreInfo from '../storeMenu/StoreInfo.vue';
export default {
    name: "AdminStoreNav",
    components: { OrderNav, DeliverNav, SalesNav, ShowState, ProductNav, EmployeeNav, StoreInfo },
}
</script>
