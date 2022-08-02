<template>
    <UserMainNav></UserMainNav>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMainNav from '../user/UserMainNav.vue';

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
    },
    components: { UserMainNav }
}
</script>

<style>
</style>