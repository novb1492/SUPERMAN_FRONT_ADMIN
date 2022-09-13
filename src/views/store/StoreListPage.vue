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
            <ChangePageButton :url="url" :clazzs="'changePageButton'"></ChangePageButton>
        </div>
        <div class="pagingbox">
            {{ nowPage }}/{{ totalPage }}
        </div>
        <SearchArea :url="url" :flag="true" :valueAndTexts="valueAndTexts"></SearchArea>
    </div>
</template>
<script>
import { checkPage, checkParam } from '@/assets/js/Jslib';
import { mapGetters } from 'vuex';
import StoreList from '@/components/store/StoreList.vue';
import ChangePageButton from '@/components/paging/ChangePageButton.vue';
import SearchArea from '@/components/paging/SearchArea.vue';


export default {
    data() {
        return {
            category: null,
            keyword: null,
            flag: true,
            valueAndTexts:[{text:'이름',value:'name'},{text:'주소',value:'addr'}],
            url:'/store-list?'
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
            let keyword = this.$route.query.keyword;
            let category = this.$route.query.category;
            let page = checkPage(this.$route.query.page);
            let url = `/store/list?page=${page}&keyword=${keyword}&category=${category}`;
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
        }
    },
    components: { StoreList, ChangePageButton, SearchArea }
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