<template>
  <div style="margin-top: 70px;" class="container">
    <ul v-if="totalPage > 0">
      <li v-for="(info, index) in inforList" :key="index">
        <a href="javascript:void();" @click="goDetailPage(store.id)">
          <img :src="info.imgPath" />
          <p>{{ info.name }}</p>
          <p>{{ info.price }}원</p>
          <p v-if="info.state == 1">
            판매중
          </p>
          <p v-else-if="info.state == 0">
            품절
          </p>
          <p v-else-if="info.state == 30">
            판매중단
          </p>
        </a>
      </li>
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
        <option value="name">이름</option>
        <option value="addr">주소</option>
      </select>
      <input type="text" v-model="keyword">
      <input type="button" value="검색" @click="search" />
    </div>
  </div>
</template>

<script>
import { checkParam, showStoreInfo } from '@/assets/js/Jslib';
import { mapGetters, mapMutations } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('NavStore/changeSituation', 1);
    this.requestGet();
  },
  computed: {
    ...mapGetters('basicStore', {
      inforList: 'getInfoList',
      last: 'getLast',
      first: 'getFirst',
      nowPage: 'getNowPage',
      totalPage: 'getTotalPage'
    })
  },
  watch: {
    '$route'() {
      this.requestGet();
    }
  },
  methods: {
    requestGet() {
      let url = '/user/product/list/' + this.$route.query.storeid + '?page=' + this.$route.query.page + '&category=' + this.$route.query.category + '&val=' + this.$route.query.page;
      let changeUrl = '/product-list?storeid=' + this.$route.query.storeid + '&page=' + this.$route.query.page + '&category=' + this.$route.query.category + '&val=' + this.$route.query.page;
      this.$store.dispatch('basicStore/getInfolist', { url: url, changeUrl: changeUrl });
      showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
    },
    ...mapMutations("NavStore", {
      changeShowMarketInfo: "changeShowMarketInfo",
    }),
    nextProduct(num) {
      let page = (this.$route.query.page * 1) + num;
      let keyword = this.getKeyword();
      let category = this.$route.query.category;
      let changeUrl = '/product-list?storeid=' + this.$route.query.storeid + '&page=' + page + '&category=' + category + '&val=' + keyword + '&addr=' + this.$route.query.addr + '&storeName=' + this.$route.query.storeName;
      this.$router.push(changeUrl);
    },
    getKeyword() {
      let keyword = null;
      if (!checkParam(this.$route.query.val)) {
        keyword = this.$route.query.val;
      }
      return keyword;
    },
  },
}
</script>

<style>
</style>