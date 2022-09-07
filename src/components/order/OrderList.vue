<template lang="">
    <li>
        <a href="javascript:void();" @click="goDetailPage">
            <p>주문자명:{{ info.orderOwnName }}</p>
            <p>주문일자:{{ info.orderDate }}</p>
            <p>주문금액:{{ info.price }}원</p>
            <p>결제번호:{{ info.cardId }}</p>
            <p>배달주소:{{ info.destinationPostCode }},{{ info.destinationAddr }},{{ info.destinationDetailAddr
            }}</p>
            <p>주문자전화번호:{{ info.orderOwnPhone }}</p>
        </a>
        <input type="checkbox" :value="info.cardId" @click="checkAction" v-if="state==1" :checked="flag"/>
    </li>
</template>
<script>
import { storeCommonQuery } from '@/assets/js/Jslib';

export default {
    props: ['info','deliverArr'],
    data() {
        return {
            state:this.$route.query.state,
            cardId:this.info.cardId,
            flag:false,
        }
    },
    mounted(){
        console.log(this.deliverArr);
        if(this.deliverArr.indexOf(this.cardId)!==-1){
            this.flag=true;
        }
    },
    methods:{
        goDetailPage() {
            location.href = '/order-detail?state=' + this.state + '&paymentid=' + this.cardId + '&page=' + this.$route.query.page + storeCommonQuery(this.$route)+ '&periodFlag=' + this.$route.query.periodFlag;
        },
        checkAction(){
            this.$emit('checkAction', this.cardId);
        }
    }
}
</script>
<style lang="">
    
</style>