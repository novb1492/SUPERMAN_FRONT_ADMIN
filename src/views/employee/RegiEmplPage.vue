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

    <ul v-if="userInfo != null">
        <li>이름:{{ userInfo.firstName + userInfo.lastName }}</li>
        <li>권한:{{ userInfo.role }}</li>
        <li>아이디:{{ userInfo.userId }}</li>
    </ul>
    </p>
</template>

<script>
import { mapGetters } from 'vuex';
import { requestSearchMember } from "@/api/Member/MemberApi";
import { checkNew } from '@/assets/js/Jslib';
export default {
    data() {
        return {
            storeId: 0,
            userId: null,
            userInfo: null,
            id: null
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
        this.$store.dispatch('MarketStore/getStoreListSimple', this.$route.query.page);
    },
    methods: {
        nextStore(num) {
            let page = (this.$route.query.page * 1) + num;
            this.$router.push('/regi-employee?page=' + page);
            this.$store.dispatch('MarketStore/getStoreListSimple', page);
        },
        select(storeid) {
            this.storeId = storeid;
        },
        selectEm() {
            requestSearchMember(this.userId).then(response => {
                this.doneSearch(response)
            }).catch(error => {
                let response = error.response;
                let data = response.data;
                if (checkNew(response.status, data.message)) {
                    requestSearchMember(this.userId).then(response => {
                        this.doneSearch(response)
                    }).catch(error => {
                        this.selectEmError(error);
                    })
                } else {
                    this.selectEmError(error);

                }
            })
        },
        selectEmError(error) {
            let response = error.response;
            let data = response.data;
            if (response.status == 400) {
                alert(data.message);
            } else {
                alert('알 수 없는 에러 발생');
            }
            this.userInfo = null;
            this.userId = null;
        },
        doneSearch(response) {
            console.log(response);
            this.userInfo = response.data;
            this.id = this.userInfo.id;
        }
    }
}
</script>

<style>
</style>