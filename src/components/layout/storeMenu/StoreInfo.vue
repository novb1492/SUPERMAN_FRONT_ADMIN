<template>
  <div>
    {{showStoreInfo}}
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