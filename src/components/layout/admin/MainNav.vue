<template>
    <div class="container-fluid">
        <a class="navbar-brand " href="/">
            <p class="pinkText">SUPERMAN</p>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <!-- <a class="nav-link active" aria-current="page" href="javascript:void();" @click="test">배달시작</a>-->
                </li>
                <show-state :loginFlag="loginFlag"></show-state>
                <li class="nav-item" v-if="loginFlag">
                    <a class="nav-link" href="javascript:void();" @click="goStoreList">매장관리</a>
                </li>
                <li class="nav-item" v-if="loginFlag">
                    <a class="nav-link" href="javascript:void();" @click="goRegiStore">매장등록</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="javascript:void();" tabindex="-1"
                        aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ShowState from '../ShowState.vue';

export default {
    components: { ShowState },

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
        },
    }
}
</script>

<style>
</style>