<template>
    <div class="row" style="margin-top: 70px;">
        <div class="col">
            <ul>
                <li v-for="(store, index) in infoList" :key="index">
                    <button @click="select(store.id, store.name)">
                        <p>매장명:{{ store.name }}</p>
                        <p>주소:{{ store.address }}</p>
                    </button>
                </li>
            </ul>
            <button @click="nextStore(1)" :disabled="last">다음</button>
            <button @click="nextStore(-1)" :disabled="first">이전</button>
            {{ nowPage }}/{{ totalPage }}
        </div>
        <div class="col">
            선택한매장:{{ storeName }}
        </div>
        <div class="col">
            <input type="text" name="" id="" placeholder="초대할 직원의 아이디를 입력해주세요" v-model="userId">
            <button @click="selectEm">검색</button>
        </div>
        <div class="col">
            <ul v-if="userInfo != null">
                <li>이름:{{ userInfo.firstName + userInfo.lastName }}</li>
                <li>권한:{{ userInfo.role }}</li>
                <li>아이디:{{ userInfo.userId }}</li>
                <li><button @click="invaite">초대</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { requestSearchMember } from "@/api/Member/MemberApi";
import { checkNew, checkPage } from '@/assets/js/Jslib';
import { requestInviteMember } from "@/api/market/MarketApi";
export default {
    data() {
        return {
            storeId: 0,
            userId: null,
            userInfo: null,
            id: null,
            storeName: null
        }
    },
    watch: {
        '$route'() {
            this.requestGet();
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
        this.requestGet();
    },
    methods: {
        requestGet() {
            let page = checkPage(this.$route.query.page);
            let url = '/manage/store/regi/list?page=' + page;
            let changeUrl = '/regi-employee?page=' + page;
            this.$store.dispatch('basicStore/getInfolist', { url: url, changeUrl: changeUrl });
            this.$store.dispatch('NavStore/changeSituation', 0);
        },
        nextStore(num) {
            let page = (this.$route.query.page * 1) + num;
            let changeUrl = '/regi-employee?page=' + page;
            this.$router.push(changeUrl);
        },
        select(storeid, storename) {
            this.storeId = storeid;
            this.storeName = storename;
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
            this.storeName = null;
        },
        doneSearch(response) {
            console.log(response);
            this.userInfo = response.data;
            this.id = this.userInfo.id;
        },
        invaite() {
            let requestDate = JSON.stringify({
                "storeId": this.storeId,
                "userId": this.id
            })
            requestInviteMember(requestDate).then(response => {
                this.doneInvite(response);
            }).catch(error => {
                let response = error.response;
                let data = response.data;
                if (checkNew(response.status, data.message)) {
                    requestInviteMember(requestDate).then(response => {
                        this.doneInvite(response);
                    }).catch(error => {
                        this.errorInvite(error);
                    })
                } else {
                    this.errorInvite(error);
                }
            })
        },
        doneInvite(response) {
            let data = response.data;
            alert(data.message);
            this.$router.go(0);
        },
        errorInvite(error) {
            let response = error.response;
            let data = response.data;
            if (response.status == 400) {
                alert(data.message);
            } else {
                alert('알 수 없는 에러 발생');
            }
        }

    }
}
</script>

<style>
</style>