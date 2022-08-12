<template>
    <div style="margin-top: 70px;">
        <StoreDetail :flag="true"></StoreDetail>
    </div>
</template>

<script>
import StoreDetail from '@/components/store/StoreDetail.vue';
export default {
    mounted() {
        this.$store.dispatch('MarketStore/getStoreInfo', {id:this.$route.query.id});
    },
    components: { StoreDetail }
}
</script>

<style>
</style>