<template>
  <div style="margin-top: 70px;" class="container">
    <ul v-if="totalPage > 0">
      <ProductList v-for="(info) in inforList" :info="info" :key="info.id"></ProductList>
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
      <ProductSearchArea :url="url"></ProductSearchArea>
    </div>
  </div>
</template>

<script>
import { checkParam, showStoreInfo, storeCommonQuery } from '@/assets/js/Jslib';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ProductList from '@/components/product/ProductList.vue';
import ChangePageButton from '@/components/paging/ChangePageButton.vue';
import ProductSearchArea from '@/components/product/ProductSearchArea.vue';
export default {
    mounted() {
        this.$store.dispatch("NavStore/changeSituation", 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.requestGet();
    },
    data() {
        return {
            category: null,
            keyword: null,
            url:"/product-list?" + storeCommonQuery(this.$route)+'&'
        };
    },
    computed: {
        ...mapGetters("basicStore", {
            inforList: "getInfoList",
            last: "getLast",
            first: "getFirst",
            nowPage: "getNowPage",
            totalPage: "getTotalPage",
            doneFlag:"getDoneFlag",
        }),
        ...mapGetters("ProductStore", {
            categorys: "getCategorys"
        })
    },
    watch: {
        "$route"() {
            this.requestGet();
        },
        //만료된 리프레시토큰 이슈 해결 
        //동시요청 말고 순차적으로 요청
        "doneFlag"(){
          this.requestGetCategorys();
        }
    },
    methods: {
        search() {
            let page = 1;
            let keyword = this.keyword;
            let category = this.category;
            this.changeUrl(page, keyword, category);
        },
        ...mapActions("ProductStore", {
            requestGetCategorys: "requestGetCategorys"
        }),
        requestGet() {
            let url = "/user/product/list/" + this.$route.query.storeid + "?page=" + this.$route.query.page + "&category=" + this.$route.query.category + "&keyword=" + this.$route.query.keyword;
            this.$store.dispatch("basicStore/getInfolist", { url: url });
            this.showSearchInfoIfHave(this.$route.query.val, this.$route.query.category);
        },
        showSearchInfoIfHave(keyword, category) {
            if (!checkParam(keyword)) {
                this.keyword = keyword;
            }
            if (!checkParam(category)) {
                this.category = category;
            }
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        })
    },
    components: { ProductList, ChangePageButton, ProductSearchArea }
}
</script>

<style>
</style>