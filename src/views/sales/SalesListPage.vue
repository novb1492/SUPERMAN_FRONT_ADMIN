<template lang="">
    <div>
        <div id="day" style="width: 800px; height: 500px;"></div>
        <div id="hour" style="width: 800px; height: 500px;"></div>
        <div id="dayofweek" style="width: 800px; height: 500px;"></div>

    </div>
</template>
<script>
import { checkNew ,checkParam,create2DArray, showStoreInfo} from '@/assets/js/Jslib';
import { mapMutations } from 'vuex';
import { requestGetByPeriod } from "@/api/payment/PaymentApi";
export default {
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.reqeuestGet();
        window.google.charts.load('current', { 'packages': ['bar'] });
    },
    data() {
        return {
            storeId: this.$route.query.storeid
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
            let hourArr=this.setHourArr(data.hours);
            let dayArr=this.setDayArr(data.days);
            let dayOfWeekArr=this.setDayOfWeek(data.dayOfWeeks);
            console.log(hourArr);
            console.log(dayArr);
            console.log(dayOfWeekArr);
            this.drawChart(dayArr,'day');
            this.drawChart(hourArr,'hour');
        },
        setDayOfWeek(dayofweeks){
            let dayOfWeekArr=create2DArray(7,2);
            for(let i in dayOfWeekArr){
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
        },
        drawChart(arr,idName) {
            var data = window.google.visualization.arrayToDataTable(arr);
            var options = {
                chart: {
                    title: 'MrPizzaHut ',
                    subtitle: '일 판매차트'
                }
            };
            /*
            돔접근
            */
            var chart = new window.google.charts.Bar(document.getElementById(idName));
            var formatter = new window.google.visualization.NumberFormat({ prefix: '원', negativeParens: true });
            /**
             * 막대바 만듬  formatter.format(data, 1);
             * */
            formatter.format(data, 1);
            chart.draw(data, window.google.charts.Bar.convertOptions(options));
        }
    }
}
</script>
<style lang="">
    
</style>