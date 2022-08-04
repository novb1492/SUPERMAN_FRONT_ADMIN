<template>
    <p style="margin-top: 70px;">
    <ul>
        <li v-for="(store, index) in storeList" :key="index">
            <button @click="select(store.id)">
                <p>매장명:{{ store.name }}</p>
                <p>주소:{{ store.address }}</p>
            </button>
        </li>
    </ul>
    <button @click="nextStore(1)" :disabled="last">다음</button>
    <button @click="nextStore(-1)" :disabled="first">이전</button>
    {{ nowPage }}/{{ totalPage }}
    <br>
    <input type="text" name="" id="" placeholder="초대할 직원의 아이디를 입력해주세요" v-model="userId">
    <button @click="selectEm">검색</button>
    </p>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            page: 1,//새로고침시 페이징 유지하지 않기위해 파라미터 대신 변수로 사용
            storeId: 0,
            userId:null
        }
    },
    computed: {
        ...mapGetters('MarketStore', {
            storeList: 'getStoreList',
            last: 'getLast',
            first: 'getFirst',
            nowPage: 'getNowPage',
            totalPage: 'getTotalPage'
        })
    },
    mounted() {
        this.$store.dispatch('MarketStore/getStoreListSimple', this.page);
    },
    methods: {
        nextStore(num) {
            this.page = this.page + num;
            this.$store.dispatch('MarketStore/getStoreListSimple', this.page);
        },
        select(storeid) {
            this.storeId = storeid;
        },
        selectEm(){
            this.$store.dispatch('MarketStore/getStoreListSimple', this.page);
        }
    }
}
</script>

<style>
</style>