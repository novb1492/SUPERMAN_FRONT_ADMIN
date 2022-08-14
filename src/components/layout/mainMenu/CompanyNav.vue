<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            사업자번호관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiComapnyNum">사업자번호등록</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiComapnyNumList">보유사업자번호조회</a></li>
        </ul>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('NavStore', {
            role:'getRole'
        })
    },
    methods: {
        goRegiComapnyNum() {
            location.href = '/regi-companynum';
        },
        goRegiComapnyNumList() {
            location.href = '/regi-companynum?page=1';

        }
    }
}
</script>

<style>
</style>