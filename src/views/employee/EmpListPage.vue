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
                <ChangePageButton :url="url" :clazzs="'changePageButton'"></ChangePageButton>
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
import ChangePageButton from '@/components/paging/ChangePageButton.vue';

export default {
    components: { EmpList,ChangePageButton },
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
    data() {
        return {
            url:`/empl-list?${storeCommonQuery(this.$route)}&`
        }
    },
    methods: {
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        requestGet() {
            let url = '/employee/list/' + this.$route.query.storeid + '?page=' + this.$route.query.page;
            this.$store.dispatch('basicStore/getInfolist', { url: url });
        }
    }
}
</script>
<style lang="">
    
</style>