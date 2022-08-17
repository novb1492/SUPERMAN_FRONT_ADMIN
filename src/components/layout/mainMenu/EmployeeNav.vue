<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            직원관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiEmpl" v-if="role=='ADMIN' ||role=='MANAGE'">직원등록</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiEmpl">직원조회</a></li>
        </ul>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters("NavStore", {
            role:'getRole'
        })
    },
    methods: {
         goRegiEmpl(){
            location.href='/regi-employee';
        }
    },
}
</script>

<style>
</style>