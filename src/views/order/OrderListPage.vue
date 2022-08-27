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
                    <input type="checkbox" :value="info.cardId" v-model="deliverArr">
                </li>
                <button @click="makeDeliverRoom" :disabled="deliverArr.length==0">배달방 생성</button>
            </ul>
            <p v-else>
                검색결과가 없습니다
            </p>
        </div>
        <div class="pagingContainer">
            <div class="pagingbox">
                <button @click="nextOrder(1)" :disabled="last">다음</button>
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
import {  checkNew, checkParam, show400ErrorList, showStoreInfo } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';
import { requestSave } from '@/api/product/ProductApi';
export default {
    data() {
        return {
            category: null,
            keyword: null,
            deliverArr: [],
            storeid: this.$route.query.storeid,
            flag: true
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
        }
    },
    methods: {
        makeDeliverRoom() {
            let data = JSON.stringify({
                "cardIds": this.deliverArr,
                "storeId": this.storeid
            })
            console.log(data);
            requestSave(data).then(response => {
                this.insertDone(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestSave(data).then(response => {
                        this.insertDone(response.data);
                    }).catch(error => {
                        this.errorInsert(error);
                    });
                } else {
                    this.errorInsert(error);
                }
            })
        },
        insertDone(data) {
            alert(data.message);
        },
        errorInsert(error) {
            let response = error.response;
            if (response.status == 400) {
                show400ErrorList(error);
                return;
            }
            alert('정보를 불러오는데 실패했습니다');
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