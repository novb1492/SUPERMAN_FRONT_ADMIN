<template>
    <div style="margin-top: 70px;">
        <StoreDetail :flag="true" :storeInfo="storeInfo"></StoreDetail>
    </div>
</template>

<script>
import StoreDetail from '@/components/store/StoreDetail.vue';
export default {
    beforeCreate() {
        this.$store.dispatch('MarketStore/getStoreInfo', {id:this.$route.query.id});
        this.$store.dispatch('NavStore/changeSituation', 0);
    },
    components: { StoreDetail }
}
</script>

<style>
</style>