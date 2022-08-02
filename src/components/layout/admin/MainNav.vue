<template>
    <ManageMainNav></ManageMainNav>
    <li class="nav-item">
        <a class="nav-link" href="javascript:void();" @click="goRegiStore">매장등록</a>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
import ManageMainNav from '@/components/layout/manage/ManageMainNav.vue';

export default {
    components: { ManageMainNav },

    computed: {
        ...mapGetters('NavStore', {
            loginFlag: 'getLoginFlag'
        })
    },
    methods: {
        goRegiStore() {
            location.href = '/regi-store';
        },
        goStoreList() {
            location.href = '/store-list';
        }
    }
}
</script>

<style>
</style>