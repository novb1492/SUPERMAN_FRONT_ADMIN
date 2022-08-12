<template>
  <div style="margin-top: 70px;">
    <StoreDetail :flag="false"></StoreDetail>
  </div>
</template>

<script>
import StoreDetail from '@/components/store/StoreDetail.vue';

export default {
    name: "RegiStorePage",
    mounted() {
        this.$store.dispatch("NavStore/changeSituation", 0);
    },
    components: { StoreDetail }
}
</script>

<style>
</style>