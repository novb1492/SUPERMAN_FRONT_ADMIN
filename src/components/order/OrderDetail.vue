<template lang="">
    <img :src="info.productImgPath" alt="" srcset="">
    <p>주문번호:{{ info.id }}</p>
    <p>상품이름:{{ info.productName }}</p>
    <p>가격:{{ info.price }}원</p>
    <p>개수:{{ info.totalCount }}</p>
    <p>이벤트:{{ info.eventName }}</p>
    <button  @click="update"
        :hidden="updateFlag">부분환불</button>
    <input type="number"  v-model="cancleCount" :min="1" :max="info.totalCount" :hidden="countFlag">
    <button  @click="refund" :hidden="refundFlag">결제취소</button>
    <button  @click="cancle" :hidden="cancleFlag">취소</button>
    <p :hidden="cancleAllFlag">환불된 제품입니다</p>
</template>
<script>
import { requestRefund } from '@/api/order/OrderApi';
import { checkNew, errorHandle } from '@/assets/js/Jslib';

export default {
    props: ['info'],
    data() {
        return {
            state:this.info.state,
            orederId:this.info.id,
            updateFlag:false,
            countFlag:true,
            cancleFlag:true,
            refundFlag:true,
            cancleAllFlag:true,
            cancleCount:0
        }
    },
    mounted(){
        if(this.state == 10 || this.state == 127){
            this.cancleAllFlag=false;
            this.updateFlag=true;
        }
    },
    methods:{
        cancle() {
            this.updateFlag=false;
            this.countFlag=true;
            this.cancleFlag=true;
            this.refundFlag=true;
        },
        update() {
            this.updateFlag=true;
            this.countFlag=false;
            this.cancleFlag=false;
            this.refundFlag=false;
        },
        refund() {
            if (confirm(`주문번호:${this.orederId}을 환불하시겠습니까?`)) {
                let data = JSON.stringify({
                    "orderId": this.orederId,
                    "count": this.cancleCount
                });
                requestRefund(data).then(response => {
                    this.refundDone(response.data);
                }).catch(error => {
                    let response = error.response;
                    let responseData = response.data;
                    if (checkNew(response.status, responseData.message)) {
                        requestRefund(data).then(response => {
                            this.refundDone(response.data);
                        }).catch(error => {
                            errorHandle(error);
                        });
                    }
                    else {
                        errorHandle(error);
                    }
                });
            }
        },
        refundDone(data) {
            alert(data.message);
            this.$router.go(0);
        },
    }
}
</script>
<style lang="">
    
</style>