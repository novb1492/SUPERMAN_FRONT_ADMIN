<template>
    <div style="margin-top: 70px;">
        <OrderDetail v-for="(info) in infoArr" :info="info" :key="info.id"></OrderDetail>
        <div>
            <div>결제정보</div>
            <p> 주문 총금액:{{ payment.totalPrice }}</p>
            <p>카드사 이름:{{ payment.bankName }}</p>
            <p>카드번호:{{ payment.cardNum }}</p>
        </div>
        <button @click="refndAll">전체 환불</button>
    </div>
</template>

<script>
import { requestGetByCardId, requestRefundAll } from "@/api/order/OrderApi";
import { checkNew, errorHandle, showStoreInfo } from '@/assets/js/Jslib';
import { mapMutations } from "vuex";
import OrderDetail from "@/components/order/OrderDetail.vue";
export default {
    data() {
        return {
            cardId: this.$route.query.paymentid,
            storeId: this.$route.query.storeid,
            infoArr: [],
            payment: "",
            state: this.$route.query.state,
            cancleCount: 0
        };
    },
    mounted() {
        this.$store.dispatch("NavStore/changeSituation", 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        requestGetByCardId({ cardId: this.cardId, storeId: this.storeId }).then(response => {
            this.getDone(response.data);
        }).catch(error => {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestGetByCardId({ cardId: this.cardId, storeId: this.storeId }).then(response => {
                    this.getDone(response.data);
                }).catch(error => {
                    errorHandle(error);
                });
            }
            else {
                errorHandle(error);
            }
        });
    },
    methods: {
        refndAll() {
            requestRefundAll(this.cardId).then(response => {
                this.refundDone(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestRefundAll(this.cardId).then(response => {
                        this.refundDone(response.data);
                    }).catch(error => {
                        errorHandle(error);
                    });
                }
                else {
                    errorHandle(error);
                }
            });
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        getDone(data) {
            this.infoArr = data.selectDtos;
            this.payment = data.selectForOrderDto;
        }
    },
    components: { OrderDetail }
}
</script>

<style>
</style>