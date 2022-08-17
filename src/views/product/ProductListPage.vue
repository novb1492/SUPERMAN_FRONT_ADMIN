<template>
  <div style="margin-top: 70px;">
    fdfd
  </div>
</template>

<script>
import { showStoreInfo } from '@/assets/js/Jslib';
import { mapMutations } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('NavStore/changeSituation', 1);
    showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
  },
  methods: {
    ...mapMutations("NavStore", {
      changeShowMarketInfo: "changeShowMarketInfo",
    }),
  },
}
</script>

<style>
</style>