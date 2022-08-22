<template>
    <div style="margin-top: 70px;">
        <div v-for="(info, index) in infoArr" :key="index">
            <img :src="info.productImgPath" alt="" srcset="">
            <p>주문번호:{{info.id}}</p>
            <p>상품이름:{{info.productName}}</p>
            <p>가격:{{info.price}}원</p>
            <p>개수:{{info.totalCount}}</p>
            <p>이벤트:{{info.eventName}}</p>
            <button :id="info.id+'try'" @click="update(info.id)" :disabled="state==10">환불/부분환불</button>
            <button :id="info.id+'refund'" @click="refound(info.id)" hidden>결제취소</button>
            <button :id="info.id+'cancle'" @click="cancle(info.id)" hidden>취소</button>
            <p v-if="info.state==10">환불된 제품입니다</p>
        </div>
        <div>
            <div>결제정보</div>
             <p> 주문 총금액:{{payment.totalPrice}}</p>
             <p>카드사 이름:{{payment.bankName}}</p>
             <p>카드번호:{{payment.cardNum}}</p> 
        </div>
        
    </div>
</template>

<script>
import { requestGetByCardId } from "@/api/order/OrderApi";
import { checkNew, show400ErrorList, showStoreInfo } from '@/assets/js/Jslib';
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            cardId: this.$route.query.paymentid,
            storeId: this.$route.query.storeid,
            infoArr:[],
            payment:'',
            state:this.$route.query.state
        }
    },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        requestGetByCardId({ cardId: this.cardId, storeId: this.storeId }).then(response => {
            this.getDone(response.data);
        }).catch(error => {
            console.log(error);
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestGetByCardId({ cardId: this.cardId, storeId: this.storeId }).then(response => {
                    this.getDone(response.data);
                }).catch(error => {
                    this.errorGet(error);
                });
            } else {
                this.errorGet(error);
            }
        });
    },
    methods: {
        cancle(id){
            document.getElementById(id+'try').hidden=false;
            document.getElementById(id+'cancle').hidden=true;
            document.getElementById(id+'refund').hidden=true;
        },
        update(id){
            document.getElementById(id+'try').hidden=true;
            document.getElementById(id+'cancle').hidden=false;
            document.getElementById(id+'refund').hidden=false;
        },
        refund(id){
            if(confirm('주문번호:'+id+'을 환불하시겠습니까?')){
                alert('a');
            }
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        getDone(data) {
            console.log(data.selectForOrderDto.cardNum);
            this.infoArr=data.selectDtos;
            this.payment=data.selectForOrderDto;
        },
        errorGet(error) {
            let response = error.response;
            if (response.status == 400) {
                show400ErrorList(error);
                return;
            }
            alert(response.data.message);
        }
    }
}
</script>

<style>
</style>