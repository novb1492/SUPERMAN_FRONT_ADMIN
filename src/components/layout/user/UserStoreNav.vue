<template>
    <ShowState></ShowState>
    <OrderNav></OrderNav>
    <DeliverNav></DeliverNav>
    <ProductNav></ProductNav>
</template>

<script>
import OrderNav from '@/components/layout/storeManu/OrderNav.vue';
import DeliverNav from "@/components/layout/storeManu/DeliverNav.vue";
import ShowState from '../ShowState.vue';
import ProductNav from '../storeMenu/ProductNav.vue';
export default {
    name: "ManageStoreNav",
    components: { OrderNav, DeliverNav, ShowState, ProductNav }
}
</script>
