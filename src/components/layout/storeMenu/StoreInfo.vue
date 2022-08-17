<template>
  <div>
    <span>조회중인매장:{{showStoreInfo.name}}</span>
    <br>
    <span>주소:{{showStoreInfo.addr}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('NavStore', {
            showStoreInfo: 'getShowMarketInfo'
        })

    },
}
</script>

<style>
</style>