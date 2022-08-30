<template>
    <ul class="menu-ul">
        <li class="menu-li" @click="active">직원관리</li>
        <ul class="menu-detail-ul" :class="{ 'active': flag }">
            <li v-if="role=='ADMIN' ||role=='MANAGE'" @click="goRegiEmpl">직원등록</li>
            <li v-if="situataion==1">직원조회</li>
        </ul>
    </ul>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters("NavStore", {
            role:'getRole',
            situataion: 'getSituation'
        })

    },
    data() {
        return {
            flag: false
        };
    },
    methods: {
        goRegiEmpl(){
            location.href='/regi-employee?page=1';
        },
        active(){
            if(this.flag){
                this.flag=false;
                return;
            }
            this.flag=true;
        }
    },
}
</script>

<style>
</style>