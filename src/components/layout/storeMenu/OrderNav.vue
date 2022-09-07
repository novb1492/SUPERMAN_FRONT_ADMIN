<template>
    <ul class="menu-ul">
        <li class="menu-li" @click="active">주문관리 </li>
        <ul class="menu-detail-ul" :class="{ 'active': flag }">
            <li @click="goOrder(100)">완료된주문</li>
            <li @click="goOrder(1)">들어온주문</li>
            <li @click="goOrder(10)">취소된주문</li>
        </ul>
    </ul>

</template>

<script>
import { storeCommonQuery } from '@/assets/js/Jslib';


export default {
    name: 'OrderNav',
    methods: {
        goOrder(num) {
            location.href = '/order-list?state=' + num + '&page=1&periodFlag=false'+storeCommonQuery(this.$route);
        },
        active() {
            if (this.flag) {
                this.flag = false;
                return;
            }
            this.flag = true;
        }
    },
    data() {
        return {
            flag: false
        };
    }
}
</script>
