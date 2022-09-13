<template>
    <ul class="menu-ul">
        <li class="menu-li" @click="active"> 매출관리</li>
        <ul class="menu-detail-ul" :class="{ 'active': flag }">
            <li @click="goSalesListPage">매출확인</li>
        </ul>
    </ul>
</template>

<script>
import { storeCommonQuery } from '@/assets/js/Jslib';


export default {
    name: 'SalesNav',
    data() {
        return {
            flag: false
        };
    },
    methods: {
        goSalesListPage() {
            var today = new Date();
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            location.href = `/sales-list?year=${year}&month=${month}${storeCommonQuery(this.$route)}`;
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
