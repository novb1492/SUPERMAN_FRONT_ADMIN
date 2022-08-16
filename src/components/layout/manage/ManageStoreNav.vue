<template>
    <ShowState></ShowState>
    <OrderNav></OrderNav>
    <DeliverNav></DeliverNav>
    <ProductNav></ProductNav>
    <SalesNav></SalesNav>
</template>

<script>
import OrderNav from '@/components/layout/storeManu/OrderNav.vue';
import DeliverNav from "@/components/layout/storeManu/DeliverNav.vue";
import SalesNav from "@/components/layout/storeManu/SalesNav.vue";
import ShowState from '../ShowState.vue';
import ProductNav from '../storeManu/ProductNav.vue';
export default {
    name: "ManageStoreNav",
    components: { OrderNav, DeliverNav, SalesNav, ShowState, ProductNav }
}
</script>
