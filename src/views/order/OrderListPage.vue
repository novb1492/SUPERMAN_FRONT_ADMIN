<template>
    <div style="margin-top: 70px;">
        <div style="margin-top: 70px;" class="container">
            <ul v-if="totalPage > 0">
                <li v-for="(info, index) in inforList" :key="index">
                    <a href="javascript:void();" @click="goDetailPage(info.cardId)">
                        <p>주문자명:{{ info.orderOwnName }}</p>
                        <p>주문일자:{{ info.orderDate }}</p>
                        <p>주문금액:{{ info.price }}원</p>
                        <p>결제번호:{{ info.cardId }}</p>
                        <p>배달주소:{{ info.destinationPostCode }},{{ info.destinationAddr }},{{ info.destinationDetailAddr
                        }}</p>
                        <p>주문자전화번호:{{ info.orderOwnPhone }}</p>
                    </a>
                    <input type="checkbox" :id="info.cardId + 'check'" @click="toArr(info.cardId)">
                </li>
            </ul>
            <p v-else>
                검색결과가 없습니다
            </p>
        </div>
        <div class="pagingContainer">
            <div class="pagingbox">
                <button @click="nextOrder(1)">다음</button>
                <button @click="nextOrder(-1)" :disabled="first">이전</button>
            </div>
            <div class="pagingbox">
                {{ nowPage }}/{{ totalPage }}
            </div>
            <div class="pagingbox">
                <select name="pets" id="pet-select" v-model="category">
                    <option value="addr">
                        주소
                    </option>
                    <option value="name">
                        주문자명
                    </option>
                </select>
                <input type="text" v-model="keyword">
                <input type="button" value="검색" @click="search" />
            </div>
        </div>
    </div>
</template>

<script>
import { checkParam, showStoreInfo } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            category: null,
            keyword: null,
            deliverArr: []
        }
    },
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

        },
        'inforList'() {
            this.$nextTick(() => {
                for (var i in this.inforList) {
                    let cardId = this.inforList[i].cardId;
                    let index = this.deliverArr.indexOf(cardId);
                    if (index >= 0) {
                        document.getElementById(cardId + 'check').checked = true;
                    }else{
                        document.getElementById(cardId + 'check').checked = false;
                    }
                }
            });
        }
    },
    methods: {
        toArr(cardId) {
            let index = this.deliverArr.indexOf(cardId);
            if (index < 0) {
                this.deliverArr[this.deliverArr.length] = cardId;
            } else {
                this.deliverArr.splice(index, 1);
            }
        },
        goDetailPage(cardId) {
            location.href = '/order-detail?state=' + this.$route.query.state + '&paymentid=' + cardId + '&page=' + this.$route.query.page + '&&storeid=' + this.$route.query.storeid + '&storeName=' + this.$route.query.storeName + '&addr=' + this.$route.query.addr + '&periodFlag=' + this.$route.query.periodFlag;
        },
        requestGet() {
            let url = '/order/list/' + this.$route.query.storeid + '/' + this.$route.query.state + '?page=' + this.$route.query.page + '&category=' + this.$route.query.category + '&keyword=' + this.$route.query.keyword + '&periodFlag=' + this.$route.query.periodFlag;
            this.$store.dispatch('basicStore/getInfolist', { url: url });
            this.showSearchInfoIfHave(this.$route.query.keyword, this.$route.query.category);
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        showSearchInfoIfHave(keyword, category) {
            if (!checkParam(keyword)) {
                this.keyword = keyword;
            }
            if (!checkParam(category)) {
                this.category = category;
            }
        },
        nextOrder(num) {
            let page = (this.$route.query.page * 1) + num;
            let keyword = this.$route.query.keyword;
            let category = this.$route.query.category;
            this.changeUrl(page, keyword, category);
        },
        changeUrl(page, keyword, category) {
            let changeUrl = '/order-list?state=' + this.$route.query.state + '&storeid=' + this.$route.query.storeid + '&page=' + page + '&category=' + category + '&keyword=' + keyword + '&addr=' + this.$route.query.addr + '&storeName=' + this.$route.query.storeName;
            this.$router.push(changeUrl);
        },
        search() {
            let page = 1;
            let keyword = this.keyword;
            let category = this.category;
            this.changeUrl(page, keyword, category);
        },
    }
}
</script>

<style>
</style>