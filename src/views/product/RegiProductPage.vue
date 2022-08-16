<template>
    <div style="margin-top: 70px;">
        <ProductDetail :flag="false"></ProductDetail>
    </div>
</template>

<script>
import ProductDetail from '@/components/product/ProductDetail.vue';
export default {
    components: { ProductDetail },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
    },
}
</script>

<style>
</style>