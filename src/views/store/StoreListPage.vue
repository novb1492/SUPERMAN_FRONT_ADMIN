<template>
    <div style="margin-top: 70px;">
        asf
    </div>
</template>

<script>
import { checkPage } from '@/assets/js/Jslib';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('MarketStore', {
            storeList: 'getStoreList',
            last: 'getLast',
            first: 'getFirst',
            nowPage: 'getNowPage',
            totalPage: 'getTotalPage'
        }),
        ...mapGetters('NavStore', {
            role: 'getRole',
        })
    },
    mounted() {
        let page=checkPage(this.$route.query.page);
        let data=JSON.stringify({
            "role":this.role,
            "page":page,
            "keyword":"this.$route.query.keyword"
        });
        this.$store.dispatch('MarketStore/getStoreByRole', data);

    }
}
</script>

<style>
</style>