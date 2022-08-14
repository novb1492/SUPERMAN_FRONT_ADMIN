<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            매장관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="javascript:void();" @click="goRegiStore" v-if="role=='ADMIN'">매장등록</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">보유매장조회</a></li>
        </ul>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name:"StoreNav",
    computed: {
        ...mapGetters("NavStore", {
            role:'getRole'
        })
    },
    methods: {
        goStoreList() {
            location.href = '/store-list?page=1';
        },
        goRegiStore() {
            location.href = '/regi-store';
        }
    }
}
</script>

<style>
</style>