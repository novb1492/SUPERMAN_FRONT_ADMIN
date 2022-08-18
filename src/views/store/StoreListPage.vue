<template>
    <div style="margin-top: 70px;" class="container">
        <ul v-if="totalPage > 0">
            <li v-for="(store, index) in infoList" :key="index">
                <a href="javascript:void();" @click="goDetailPage(store.id)">
                    <img :src="store.imgPath" />
                    <p>매장명:{{ store.name }}</p>
                    <p>주소:{{ store.address }}</p>
                    <p v-if="store.state == 1">
                        영업중
                    </p>
                    <p v-else-if="store.state == 0">
                        영업종료
                    </p>
                    <p v-else-if="store.state == 40">
                        폐업
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
            <button @click="nextStore(1)" :disabled="last">다음</button>
            <button @click="nextStore(-1)" :disabled="first">이전</button>
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
import { checkPage, checkParam } from '@/assets/js/Jslib';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            category: 'name',
            keyword: null
        }
    },
    computed: {
        ...mapGetters('basicStore', {
            infoList: 'getInfoList',
            last: 'getLast',
            first: 'getFirst',
            nowPage: 'getNowPage',
            totalPage: 'getTotalPage'
        }),
        ...mapGetters('NavStore', {
            role: 'getRole',
        })
    },
    mounted() {
        let keyword = this.getKeyword();
        let category = this.$route.query.category;
        let page = checkPage(this.$route.query.page);
        let url = '/store/list?page=' + page + '&keyword=' + keyword + '&category=' + category;
        let changeUrl = '/store-list?page=' + page + '&keyword=' + keyword + '&category=' + category;
        this.$store.dispatch('basicStore/getInfolist', { url: url, changeUrl: changeUrl, router: this.$router });
        this.$store.dispatch('NavStore/changeSituation', 0);
    },
    methods: {
        goDetailPage(storeId) {
            location.href = '/store-detail?storeid=' + storeId;
        },
        nextStore(num) {
            let page = (this.$route.query.page * 1) + num;
            let keyword = this.getKeyword();
            let category = this.$route.query.category;
            let url = '/store/list?page=' + page + '&keyword=' + keyword + '&category=' + category;
            let changeUrl = '/store-list?page=' + page + '&keyword=' + keyword + '&category=' + category;
            this.$store.dispatch('basicStore/getInfolist', { url: url, changeUrl: changeUrl, router: this.$router });
        },
        getKeyword() {
            let keyword = null;
            if (!checkParam(this.$route.query.keyword)) {
                keyword = this.$route.query.keyword;
            }
            return keyword;
        },
        search() {
            let url = '/store/list?page=1&keyword=' + this.keyword + '&category=' + this.category;
            let changeUrl = '/store-list?page=1&keyword=' + this.keyword + '&category=' + this.category;
            this.$store.dispatch('basicStore/getInfolist', { url: url, changeUrl: changeUrl, router: this.$router });
        }
    }
}
</script>

<style scoped>
ul li {
    list-style-type: none;
    float: left;
}

.container {

    display: flex;
    flex-direction: column;
    margin: 0;
}

.pagingContainer {

    display: flex;
    flex-direction: column;
    padding: 3rem;
    margin-right: 3rem;
    align-items: center;
}

.pagingbox {

    margin-bottom: 1em;

}
</style>