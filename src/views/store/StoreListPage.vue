<template>
    <div style="margin-top: 70px;">
        asf
        {{storeList}}
    </div>
</template>

<script>
import { checkPage, checkParam } from '@/assets/js/Jslib';
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
        let keyword=null;
        if(!checkParam(this.$route.query.keyword)){
            keyword=this.$route.query.keyword;
        }
        let category=this.$route.query.category;
        let page=checkPage(this.$route.query.page);
        let data=JSON.stringify({
            "role":this.role,
            "page":page,
            "keyword":keyword,
            "category":category
        });
        this.$store.dispatch('MarketStore/getStoreByRole', data);

    }
}
</script>

<style>
</style>