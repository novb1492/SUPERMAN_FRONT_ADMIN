<template>
    <ShowState></ShowState>
    <OrderNav></OrderNav>
    <DeliverNav></DeliverNav>
    <ProductNav></ProductNav>
    <EmployeeNav></EmployeeNav>
</template>

<script>
import OrderNav from '@/components/layout/storeMenu/OrderNav.vue';
import DeliverNav from "@/components/layout/storeMenu/DeliverNav.vue";
import ShowState from '../ShowState.vue';
import ProductNav from '../storeMenu/ProductNav.vue';
import EmployeeNav from '../mainMenu/EmployeeNav.vue';
export default {
    name: "ManageStoreNav",
    components: { OrderNav, DeliverNav, ShowState, ProductNav, EmployeeNav }
}
</script>
