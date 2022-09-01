<template>
    <li class="menu-li" v-if="!loginFlag" @click="goLogin">로그인</li>
    <li class="menu-li" v-else @click="logOut">로그아웃</li>
</template>

<script>
import { requestLogOut } from '@/api/Member/MemberApi';
import { checkNew, errorHandle } from '@/assets/js/Jslib';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('NavStore', {
            loginFlag: 'getLoginFlag',
        })
    },
    methods: {
        goLogin() {
            location.href = '/login';
        },
        logOut() {
            requestLogOut().then(()=>{
                this.doneLogOut();
            }).catch(error=>{
                let response = error.response;
                let data = response.data;
                if (checkNew(response.status, data.message)) {
                    requestLogOut().then(() => {
                        this.doneLogOut();
                    }).catch(error => {
                        errorHandle(error);
                    })
                } else {
                    errorHandle(error);
                }
            })
        },
        doneLogOut(){
            this.$store.dispatch('NavStore/changeLoginFlag', false);
            localStorage.removeItem('info');
            this.$router.go(0);
        }
    }
}
</script>

<style>
</style>