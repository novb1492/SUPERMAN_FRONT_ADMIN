<template>
    <li class="menu-li" v-if="!loginFlag" @click="goLogin">로그인</li>
    <li class="menu-li" v-else @click="logOut">로그아웃</li>
</template>

<script>
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
            this.$store.dispatch('NavStore/changeLoginFlag', false);
            localStorage.removeItem('authentication');
            localStorage.removeItem('info');
            this.$router.go(0);
        }
    }
}
</script>

<style>
</style>