<template>
    <div style="margin-top: 70px;">
        <div style="margin-top: 70px;" class="container">
            <ul v-if="totalPage > 0">
                <li v-for="(info, index) in inforList" :key="index">
                    <a href="javascript:void();" @click="goDetailPage(info.deliverRoomId)">
                        <p>주문번호:{{info.deliverRoomId}}</p>
                        <p>대표결제번호:{{ info.cardId }}</p>
                        <p>대표배달주소:{{ info.postCode }},{{ info.address }},{{ info.detailAddress}}</p>
                    </a>
                </li>
            </ul>
            <p v-else>
                검색결과가 없습니다
            </p>
        </div>
        <div class="pagingContainer">
            <div class="pagingbox">
                <button @click="nextDeliver(1)" :disabled="last">다음</button>
                <button @click="nextDeliver(-1)" :disabled="first">이전</button>
            </div>
            <div class="pagingbox">
                {{ nowPage }}/{{ totalPage }}
            </div>
        </div>
    </div>
</template>
<script>
import { showStoreInfo } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';

export default {
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
            let url = '/deliver/list/' + this.$route.query.storeid + '/' + this.$route.query.state + '?page=' + this.$route.query.page;
            this.$store.dispatch('basicStore/getInfolist', { url: url });
        },
        nextDeliver(num) {
            let page = (this.$route.query.page * 1) + num;
            this.changeUrl(page);
        },
        changeUrl(page) {
            let changeUrl = '/deliver-list?state=' + this.$route.query.state + '&storeid=' + this.$route.query.storeid + '&page=' + page + '&addr=' + this.$route.query.addr + '&storeName=' + this.$route.query.storeName;
            this.$router.push(changeUrl);
        },
        goDetailPage(deliverId){
            location.href='/deliver-detail?deliverid='+deliverId+'&storeid=' + this.$route.query.storeid + '&addr=' + this.$route.query.addr + '&storeName=' + this.$route.query.storeName;
        }
    }
}
</script>
<style >
</style>