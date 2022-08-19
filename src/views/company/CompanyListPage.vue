<template>
    <div style="margin-top: 70px;">
        <div v-for="(company, index) in infoList" :key="index" >
            <CompanyDetail :companyinfo="company" :flag="false" :key="componentKey"></CompanyDetail>
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
                </select>
                <input type="text" v-model="keyword">
                <input type="button" value="검색" @click="search" />
            </div>
        </div>
    </div>
</template>

<script>
import CompanyDetail from '@/components/company/CompanyDetail.vue'
import { mapGetters } from 'vuex';
import { checkPage } from '@/assets/js/Jslib';

export default {
    components: { CompanyDetail },
    watch: {
        '$route'() {
            this.requestGet();

        }
    },
    data() {
        return {
            category: null,
            keyword: null,
            componentKey: 0
        }
    },
    computed: {
        ...mapGetters('basicStore', {
            infoList: 'getInfoList',
            last: 'getLast',
            first: 'getFirst',
            nowPage: 'getNowPage',
            totalPage: 'getTotalPage'
        })
    },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 0);
        this.requestGet();

    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        changeKey(num) {
            this.key = num + this.key;
        },
        requestGet() {
            let keyword = this.$route.query.keyword;
            let category = this.$route.query.category;
            let page = checkPage(this.$route.query.page);
            let url = '/admin/company/list?page=' + page + '&keyword=' + keyword + '&category=' + category;
            this.$store.dispatch('basicStore/getInfolist', { url: url });
            this.forceRerender();
        },
        nextStore(num) {
            let page = (this.$route.query.page * 1) + num;
            let keyword = this.$route.query.keyword;
            let category = this.$route.query.category;
            this.changeUrl(page, keyword, category);
        },
        search() {
            this.changeUrl(1, this.keyword, this.category);
        },
        changeUrl(page, keyword, category) {
            let changeUrl = '/company-list?page=' + page + '&keyword=' + keyword + '&category=' + category;
            this.$router.push(changeUrl);
        }
    }
}
</script>

<style>
</style>