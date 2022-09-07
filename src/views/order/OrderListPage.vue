<template>
    <div style="margin-top: 70px;">
        <div style="margin-top: 70px;" class="container">
            <ul v-if="totalPage > 0">
                <OrderList v-for="(info) in inforList" :info="info" :key="info.cardId"></OrderList>
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
import {  checkNew, checkParam, errorHandle, showStoreInfo, storeCommonQuery } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';
import { requestSave } from '@/api/deliver/DeliverApi';
import OrderList from '@/components/order/OrderList.vue';
export default {
    data() {
        return {
            category: null,
            keyword: null,
            deliverArr: [],
            storeid: this.$route.query.storeid,
            flag: true
        };
    },
    mounted() {
        this.$store.dispatch("NavStore/changeSituation", 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.requestGet();
    },
    computed: {
        ...mapGetters("basicStore", {
            inforList: "getInfoList",
            last: "getLast",
            first: "getFirst",
            nowPage: "getNowPage",
            totalPage: "getTotalPage"
        }),
    },
    watch: {
        "$route"() {
            this.requestGet();
        }
    },
    methods: {
        makeDeliverRoom() {
            let data = JSON.stringify({
                "cardIds": this.deliverArr,
                "storeId": this.storeid
            });
            requestSave(data).then(response => {
                this.insertDone(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestSave(data).then(response => {
                        this.insertDone(response.data);
                    }).catch(error => {
                        errorHandle(error);
                    });
                }
                else {
                    errorHandle(error);
                }
            });
        },
        insertDone(data) {
            alert(data.message);
        },
        requestGet() {
            let url = "/order/list/" + this.$route.query.storeid + "/" + this.$route.query.state + "?page=" + this.$route.query.page + "&category=" + this.$route.query.category + "&keyword=" + this.$route.query.keyword + "&periodFlag=" + this.$route.query.periodFlag;
            this.$store.dispatch("basicStore/getInfolist", { url: url });
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
            let changeUrl = "/order-list?state=" + this.$route.query.state + "&page=" + page + "&category=" + category + "&keyword=" + keyword + storeCommonQuery(this.$route);
            this.$router.push(changeUrl);
        },
        search() {
            let page = 1;
            let keyword = this.keyword;
            let category = this.category;
            this.changeUrl(page, keyword, category);
        },
    },
    components: { OrderList }
}
</script>

<style>
</style>