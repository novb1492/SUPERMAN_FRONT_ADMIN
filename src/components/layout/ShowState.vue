<template>
    <li class="nav-item" v-if="!loginFlag">
        <a class="nav-link" href="javascript:void();" @click="goLogin">로그인</a>
    </li>
    <li class="nav-item" v-else>
        <a class="nav-link" href="javascript:void();" @click="logOut">로그아웃</a>
    </li>
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
            this.$router.go(0);
        }
    }
}
</script>

<style>
</style>