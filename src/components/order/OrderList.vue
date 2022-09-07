<template lang="">
    <li>
        <a href="javascript:void();" @click="goDetailPage(info.cardId)">
            <p>주문자명:{{ info.orderOwnName }}</p>
            <p>주문일자:{{ info.orderDate }}</p>
            <p>주문금액:{{ info.price }}원</p>
            <p>결제번호:{{ info.cardId }}</p>
            <p>배달주소:{{ info.destinationPostCode }},{{ info.destinationAddr }},{{ info.destinationDetailAddr
            }}</p>
            <p>주문자전화번호:{{ info.orderOwnPhone }}</p>
        </a>
        <input type="checkbox" :value="info.cardId" v-model="deliverArr"/>
    </li>
</template>
<script>
import { storeCommonQuery } from '@/assets/js/Jslib';

export default {
    props: ['info'],
    methods:{
        goDetailPage(cardId) {
            location.href = '/order-detail?state=' + this.$route.query.state + '&paymentid=' + cardId + '&page=' + this.$route.query.page + storeCommonQuery(this.$route)+ '&periodFlag=' + this.$route.query.periodFlag;
        },
    }
}
</script>
<style lang="">
    
</style>