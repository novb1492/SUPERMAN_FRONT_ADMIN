<template>
    <li class="menu-li" @click="active">사업자번호관리</li>
    <li class="menu-detail-li" :class="{ 'active': flag }" @click="goRegiComapnyNum">사업자번호등록</li>
    <li class="menu-detail-li" :class="{ 'active': flag }" @click="goRegiComapnyNumList">보유사업자번호조회</li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('NavStore', {
            role: 'getRole'
        })
    },
    data() {
        return {
            flag: false
        };
    },
    methods: {
        goRegiComapnyNum() {
            location.href = '/regi-companynum';
        },
        goRegiComapnyNumList() {
            location.href = '/company-list?page=1';

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