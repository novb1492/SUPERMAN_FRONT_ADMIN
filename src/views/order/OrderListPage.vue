<template>
    <div style="margin-top: 70px;">
        <div style="margin-top: 70px;" class="container">
            <ul v-if="totalPage > 0">
                <OrderList v-for="(info) in inforList" :info="info" :deliverArr="deliverArr" :key="info.cardId" v-on:checkAction="checkAction"></OrderList>
                <button @click="makeDeliverRoom" :disabled="deliverArr.length==0">배달방 생성</button>
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
            <div class="pagingbox">
                <SearchArea :url="url" :flag="true" :valueAndTexts="valueAndTexts"></SearchArea>
            </div>
        </div>
    </div>
</template>

<script>
import {  checkNew, checkParam, errorHandle, showStoreInfo, storeCommonQuery } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';
import { requestSave } from '@/api/deliver/DeliverApi';
import OrderList from '@/components/order/OrderList.vue';
import ChangePageButton from '@/components/paging/ChangePageButton.vue';
import SearchArea from '@/components/paging/SearchArea.vue';
export default {
    data() {
        return {
            category: null,
            keyword: null,
            deliverArr: [],
            storeid: this.$route.query.storeid,
            flag: true,
            url:"/order-list?state=" + this.$route.query.state  + storeCommonQuery(this.$route)+'&',
            valueAndTexts:[{text:'이름',value:'name'},{text:'주소',value:'addr'}]
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
        checkAction(cardId){
            let index=this.deliverArr.indexOf(cardId);
            if(index===-1){
                this.deliverArr[this.deliverArr.length]=cardId;
            }else{
                this.deliverArr.splice(index,1);
            }
        }
    },
    components: { OrderList, ChangePageButton, SearchArea }
}
</script>

<style>
</style>