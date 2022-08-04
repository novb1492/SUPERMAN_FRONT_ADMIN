<template>
    <p style="margin-top: 70px;">
        {{storeList}}
        <button @click="nextStore(1)" >다음</button>
        {{page}}
    </p>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            page:1
        }
    },
    computed: {
        ...mapGetters('MarketStore', {
            storeList: 'getStoreList',
        })
    },
    mounted() {
        this.$store.dispatch('MarketStore/getStoreListSimple', this.page);
    },
    methods:{
        nextStore(num){
            this.page=this.page+num;
            this.$store.dispatch('MarketStore/getStoreListSimple', this.page);
        }
    }
}
</script>

<style>
</style>