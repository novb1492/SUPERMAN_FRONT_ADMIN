<template>
    <div style="margin-top: 70px;" class="container">
        <ul v-if="totalPage > 0">
            <StoreList v-for="(store) in infoList" :info="store" :storeid="store.id" :key="store.id"></StoreList>
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
import StoreList from '@/components/store/StoreList.vue';

export default {
    data() {
        return {
            category: null,
            keyword: null,
            flag: true
        };
    },
    watch: {
        "$route"() {
            this.requestGet();
        }
    },
    computed: {
        ...mapGetters("basicStore", {
            infoList: "getInfoList",
            last: "getLast",
            first: "getFirst",
            nowPage: "getNowPage",
            totalPage: "getTotalPage"
        }),
        ...mapGetters("NavStore", {
            role: "getRole",
        })
    },
    mounted() {
        this.$store.dispatch("NavStore/changeSituation", 0);
        this.requestGet();
    },
    methods: {
        requestGet() {
            let keyword = this.getKeyword();
            let category = this.$route.query.category;
            let page = checkPage(this.$route.query.page);
            let url = "/store/list?page=" + page + "&keyword=" + keyword + "&category=" + category;
            this.showSearchInfoIfHave(keyword, category);
            this.$store.dispatch("basicStore/getInfolist", { url: url });
        },
        showSearchInfoIfHave(keyword, category) {
            if (!checkParam(keyword)) {
                this.keyword = keyword;
            }
            if (!checkParam(category)) {
                this.category = category;
            }
        },
        goDetailPage(storeId) {
            location.href = "/store-detail?storeid=" + storeId;
        },
        nextStore(num) {
            let page = (this.$route.query.page * 1) + num;
            let keyword = this.getKeyword();
            let category = this.$route.query.category;
            this.changeUrl(page, keyword, category);
        },
        getKeyword() {
            let keyword = null;
            if (!checkParam(this.$route.query.keyword)) {
                keyword = this.$route.query.keyword;
            }
            return keyword;
        },
        search() {
            this.changeUrl(1, this.keyword, this.category);
        },
        changeUrl(page, keyword, category) {
            let changeUrl = "/store-list?page=" + page + "&keyword=" + keyword + "&category=" + category;
            this.$router.push(changeUrl);
        }
    },
    components: { StoreList }
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