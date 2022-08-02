<template>
    <UserMainNav></UserMainNav>
    <li class="nav-item">
        <a class="nav-link" href="javascript:void();" @click="goRegiEmpl">직원등록</a>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMainNav from '@/components/layout/user/UserMainNav.vue';

export default {
    computed: {
        ...mapGetters("NavStore", {
            situataion: "getSituation",
            loginFlag: "getLoginFlag"
        })
    },
    methods: {
        goStoreList() {
            location.href = "/store-list";
        },
         goRegiEmpl(){
            location.href='/regi-employee';
        }
    },
    components: { UserMainNav },
}
</script>

<style>
</style>