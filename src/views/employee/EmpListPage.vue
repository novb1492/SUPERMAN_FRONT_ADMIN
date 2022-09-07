<template lang="">
    <div>
        <div style="margin-top: 70px;" class="container">
            <ul v-if="totalPage > 0">
                <EmpList v-for="(info) in inforList" :info="info" :key="info.employeeId"></EmpList>
            </ul>
            <p v-else>
                검색결과가 없습니다
            </p>
        </div>
        <div class="pagingContainer">
            <div class="pagingbox">
                <button @click="nextEmpl(1)" :disabled="last">다음</button>
                <button @click="nextEmpl(-1)" :disabled="first">이전</button>
            </div>
            <div class="pagingbox">
                {{ nowPage }}/{{ totalPage }}
            </div>
        </div>
    </div>
</template>
<script>
import { showStoreInfo, storeCommonQuery } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';
import EmpList from "@/components/employee/EmpList.vue";
export default {
    components: { EmpList },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.requestGet();
    },
    computed: {
        ...mapGetters('basicStore', {
            inforList: 'getInfoList',
            last: 'getLast',
            first: 'getFirst',
            nowPage: 'getNowPage',
            totalPage: 'getTotalPage'
        }),

    },
    watch: {
        '$route'() {
            this.requestGet();
        }
    },
    methods: {
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        requestGet() {
            let url = '/employee/list/' + this.$route.query.storeid + '?page=' + this.$route.query.page;
            this.$store.dispatch('basicStore/getInfolist', { url: url });
        },
        nextEmpl(num) {
            let page = (this.$route.query.page * 1) + num;
            this.changeUrl(page);
        },
        changeUrl(page) {
            let changeUrl = '/empl-list?page=' + page + storeCommonQuery(this.$route);
            this.$router.push(changeUrl);
        }
    }
}
</script>
<style lang="">
    
</style>