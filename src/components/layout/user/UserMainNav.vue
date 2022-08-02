<template>
    <ShowState></ShowState>
    <li class="nav-item">
        <a class="nav-link" href="javascript:void();" @click="goStoreList">매장관리</a>
    </li>
    <li class="nav-item">
        <a class="nav-link disabled" href="javascript:void();" tabindex="-1" aria-disabled="true">Disabled</a>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
import ShowState from '../ShowState.vue';

export default {
    name:"UserMainNav",
    computed: {
        ...mapGetters("NavStore", {
            situataion: "getSituation",
            loginFlag: 'getLoginFlag'
        })
    },
    components: { ShowState },
    methods: {
        goStoreList() {
            location.href = '/store-list';
        },
    }
}
</script>

<style>
</style>