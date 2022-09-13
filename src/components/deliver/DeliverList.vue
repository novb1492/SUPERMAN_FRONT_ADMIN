<template lang="">
    <li>
        <a href="javascript:void();" @click="goDetailPage(info.deliverRoomId)">
            <p>주문번호:{{info.deliverRoomId}}</p>
            <p>대표결제번호:{{ info.cardId }}</p>
            <p>대표배달주소:{{ info.postCode }},{{ info.address }},{{ info.detailAddress}}</p>
        </a>
    </li>
</template>
<script>
import { storeCommonQuery } from '@/assets/js/Jslib';

export default {
    props: ['info'],
    methods:{
        goDetailPage(deliverId){
            location.href=`/deliver-detail?deliverid=${deliverId}${storeCommonQuery(this.$route)}`;
        }
    }
}
</script>
<style lang="">
    
</style>