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
      <button @click="nextProduct(1)" :disabled="last">다음</button>
      <button @click="nextProduct(-1)" :disabled="first">이전</button>
    </div>
    <div class="pagingbox">
      {{ nowPage }}/{{ totalPage }}
    </div>
    <div class="pagingbox">
      <select name="pets" id="pet-select" v-model="category">
        <option :value="cate.id" v-for="(cate, index) in categorys" :key="index">
          {{ cate.name }}
        </option>
      </select>
      <input type="text" v-model="keyword">
      <input type="button" value="검색" @click="search" />
    </div>
  </div>
</template>

<script>
import { checkParam, showStoreInfo, storeCommonQuery } from '@/assets/js/Jslib';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ProductList from '@/components/product/ProductList.vue';
export default {
    mounted() {
        this.$store.dispatch("NavStore/changeSituation", 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.requestGet();
        this.requestGetCategorys();
    },
    data() {
        return {
            category: null,
            keyword: null
        };
    },
    computed: {
        ...mapGetters("basicStore", {
            inforList: "getInfoList",
            last: "getLast",
            first: "getFirst",
            nowPage: "getNowPage",
            totalPage: "getTotalPage"
        }),
        ...mapGetters("ProductStore", {
            categorys: "getCategorys"
        })
    },
    watch: {
        "$route"() {
            this.requestGet();
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
            let url = "/user/product/list/" + this.$route.query.storeid + "?page=" + this.$route.query.page + "&category=" + this.$route.query.category + "&val=" + this.$route.query.val;
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
        }),
        nextProduct(num) {
            let page = (this.$route.query.page * 1) + num;
            let keyword = this.getKeyword();
            let category = this.$route.query.category;
            this.changeUrl(page, keyword, category);
        },
        getKeyword() {
            let keyword = null;
            if (!checkParam(this.$route.query.val)) {
                keyword = this.$route.query.val;
            }
            return keyword;
        },
        changeUrl(page, keyword, category) {
            let changeUrl = "/product-list?page=" + page + "&category=" + category + "&val=" + keyword + storeCommonQuery(this.$route);
            this.$router.push(changeUrl);
        }
    },
    components: { ProductList }
}
</script>

<style>
</style>