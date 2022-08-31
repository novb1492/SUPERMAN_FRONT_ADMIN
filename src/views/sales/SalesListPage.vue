<template lang="">
    <div>
        <ChartComponet ref="day" :idName="'day'"></ChartComponet>
        <ChartComponet ref="hour" :idName="'hour'"></ChartComponet>
        <ChartComponet ref="dayofweek" :idName="'dayofweek'"></ChartComponet>
    </div>
</template>
<script>
import { checkNew ,checkParam,create2DArray, showStoreInfo} from '@/assets/js/Jslib';
import { mapMutations } from 'vuex';
import { requestGetByPeriod } from "@/api/payment/PaymentApi";
import ChartComponet from "@/components/ChartComponet.vue";
export default {
    components: { ChartComponet },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.reqeuestGet();
    },
    data() {
        return {
            storeId: this.$route.query.storeid,
            arr:[],
            id:'',
        }
    },
    methods: {
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        reqeuestGet() {
            let month = this.$route.query.month;
            let year = this.$route.query.year
            requestGetByPeriod({ storeId: this.storeId, month: month, year: year }).then(response => {
                this.doneGet(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestGetByPeriod({ storeId: this.storeId, month: month, year: year }).then(response => {
                        this.doneGet(response.data);
                    }).catch(error => {
                        this.errorInsert(error);
                    });
                } else {
                    this.errorInsert(error);
                }
            })
        },
        doneGet(data){
            this.$refs.hour.setArr(this.setHourArr(data.hours));
            this.$refs.day.setArr(this.setDayArr(data.days));
            this.$refs.dayofweek.setArr(this.setDayOfWeek(data.dayOfWeeks));
        },
        setDayOfWeek(dayofweeks){
            let dayOfWeekArr=create2DArray(8,2);
            dayOfWeekArr[0][0]='요일';
            dayOfWeekArr[0][1]='판매금액';
            for(let i=1;i<8 ;i++){
                dayOfWeekArr[i][0]=i;
                if(checkParam(dayofweeks[i])){
                    dayOfWeekArr[i][1]=0;
                }else{
                    dayOfWeekArr[i][1]=dayofweeks[i];
                }
            }
            return dayOfWeekArr;
        },
        setDayArr(days){
            let dayArr=create2DArray(32,2);
            dayArr[0][0]='일';
            dayArr[0][1]='판매금액';
            for(let i=1;i<32 ;i++){
                dayArr[i][0]=i+'일';
                if(checkParam(days[i])){
                    dayArr[i][1]=0;
                }else{
                    dayArr[i][1]=days[i];

                }
            }
            return dayArr;
        },
        setHourArr(hours){
            let hourArr=create2DArray(24,2);
            hourArr[0][0]='시간';
            hourArr[0][1]='판매금액';
            for(let i=1;i<24 ;i++){
                hourArr[i][0]=i+'시';
                if(checkParam(hours[i])){
                    hourArr[i][1]=0;
                }else{
                    hourArr[i][1]=hours[i];

                }
            }
            return hourArr;
        }
    }
}
</script>
<style lang="">
    
</style>