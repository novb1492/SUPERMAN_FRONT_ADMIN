<template>
    <div style="margin-top: 70px;">
        <div v-for="(info, index) in infoArr" :key="index">
            {{info}}
            <img :src="info.productImgPath" alt="" srcset="">
            <p>주문번호:{{info.id}}</p>
            <p>상품이름:{{info.productName}}</p>
            <p>가격:{{info.price}}원</p>
            <p>개수:{{info.totalCount}}</p>
            <p>이벤트:{{info.eventName}}</p>
            <button @click="refund(info.id)">환불</button>
        </div>
        주문 총금액:{{totalPrice}}
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
            totalPrice:0
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
        refund(id){
            if(confirm('주문번호:'+id+'을 환불하시겠습니까?')){
                alert('a');
            }
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        getDone(data) {
            this.infoArr=data;
            // this.totalPrice=this.infoArr[0].
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