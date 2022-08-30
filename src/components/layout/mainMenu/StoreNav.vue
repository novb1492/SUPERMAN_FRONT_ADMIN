<template>
    <ul class="menu-ul">
        <li class="menu-li" @click="active">매장관리</li>
        <ul class="menu-detail-ul" :class="{ 'active': flag }">
            <li @click="goRegiStore" v-if="role == 'ADMIN'">매장등록</li>
            <li @click="goStoreList">매장조회</li>
        </ul>
    </ul>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "StoreNav",
    computed: {
        ...mapGetters("NavStore", {
            role: 'getRole'
        })
    },
    data() {
        return {
            flag: false
        };
    },
    methods: {
        goStoreList() {
            location.href = '/store-list?page=1';
        },
        goRegiStore() {
            location.href = '/regi-store';
        },
        active() {
            if (this.flag) {
                this.flag = false;
                return;
            }
            this.flag = true;
        }
    }
}
</script>

<style>
</style>