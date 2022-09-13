<template lang="">
    <div>
        {{year}}
        {{month}}
        <button @click="changeYear(1)">다음연도</button>
        <button @click="changeYear(-1)">이전연도</button>
        <button @click="changeMonth(1)">다음달</button>
        <button @click="changeMonth(-1)">이전달</button>
        <ChartComponet ref="day" :idName="'day'" :arr="dayArr"  :key="key1"></ChartComponet>
        <ChartComponet ref="hour" :idName="'hour'" :arr="hourArr"  :key="key2"></ChartComponet>
        <ChartComponet ref="dayofweek" :idName="'dayofweek'" :arr="dayofweekArr" :key="key3"></ChartComponet>
    </div>
</template>
<script>
import { checkNew, checkParam, create2DArray, errorHandle, showStoreInfo, storeCommonQuery } from '@/assets/js/Jslib';
import { mapMutations } from 'vuex';
import { requestGetByPeriod } from "@/api/payment/PaymentApi";
import ChartComponet from "@/components/ChartComponet.vue";
export default {
    components: { ChartComponet },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.requestGet();
    },
    watch: {
        '$route'() {
            this.requestGet();
        }
    },
    data() {
        return {
            storeId: this.$route.query.storeid,
            key1:1,
            key2:2,
            key3:3,
            dayArr:[],
            hourArr:[],
            dayofweekArr:[],
            year:0,
            month:0
        }
    },
    methods: {
        changeYear(num){
            let year = this.$route.query.year*1+num;
            this.$router.push(`/sales-list?year=${year}&month=${this.$route.query.month}${storeCommonQuery(this.$route)}`);
        },
        changeMonth(num){
            let month = this.getMonth(this.$route.query.month*1+num);
            this.$router.push(`/sales-list?year=${this.$route.query.year}&month=${month}${storeCommonQuery(this.$route)}`);
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        requestGet() {
            let month = this.getMonth(this.$route.query.month);
            let year = this.$route.query.year
            this.year=year;
            this.month=month;
            
            requestGetByPeriod({ storeId: this.storeId, month: month, year: year }).then(response => {
                this.doneGet(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestGetByPeriod({ storeId: this.storeId, month: month, year: year }).then(response => {
                        this.doneGet(response.data);
                    }).catch(error => {
                        errorHandle(error);
                    });
                } else {
                    errorHandle(error);
                }
            })
        },
        getMonth(month){
            if(month>12){
                month=12;
            }else if(month<1){
                month=1;
            }
            return month;
        },
        doneGet(data) {
            this.hourArr=this.setHourArr(data.hours);
            this.dayArr=this.setDayArr(data.days);
            this.dayofweekArr=this.setDayOfWeek(data.dayOfWeeks);
            /**
             * 컴포넌트 재랜더링 위해 키값 변경
             * */
            this.key1+=1;
            this.key2+=1;
            this.key3+=1;
        },
        setDayOfWeek(dayofweeks) {
            let dayOfWeekArr = create2DArray(8, 2);
            dayOfWeekArr[0][0] = '요일';
            dayOfWeekArr[0][1] = '판매금액';
            for (let i = 1; i < 8; i++) {
                dayOfWeekArr[i][0] = this.getDayIfWeekText(i);
                if (checkParam(dayofweeks[i])) {
                    dayOfWeekArr[i][1] = 0;
                } else {
                    dayOfWeekArr[i][1] = dayofweeks[i];
                }
            }
            /**
             * 일요일은 따로 처리해줘야한다
             * 
             * */
            dayOfWeekArr[7][0] = this.getDayIfWeekText(0);
            if (checkParam(dayofweeks[0])) {
                dayOfWeekArr[7][1] = 0;
            } else {
                dayOfWeekArr[7][1] = dayofweeks[0];
            }
            return dayOfWeekArr;
        },
        getDayIfWeekText(num) {
            switch (num) {
                case 0:
                    return "일";
                case 1:
                    return "월";
                case 2:
                    return "화";
                case 3:
                    return "수";
                case 4:
                    return "목";
                case 5:
                    return "금";
                case 6:
                    return "토";
                default:
                    break;
            }
        },
        setDayArr(days) {
            let dayArr = create2DArray(32, 2);
            dayArr[0][0] = '일';
            dayArr[0][1] = '판매금액';
            for (let i = 1; i < 32; i++) {
                dayArr[i][0] = i + '일';
                if (checkParam(days[i])) {
                    dayArr[i][1] = 0;
                } else {
                    dayArr[i][1] = days[i];

                }
            }
            return dayArr;
        },
        setHourArr(hours) {
            let hourArr = create2DArray(25, 2);
            hourArr[0][0] = '시간';
            hourArr[0][1] = '판매금액';
            for (let i = 1; i < 24; i++) {
                hourArr[i][0] = i + '시';
                if (checkParam(hours[i])) {
                    hourArr[i][1] = 0;
                } else {
                    hourArr[i][1] = hours[i];

                }
            }
             /**
             * 24시==0은 따로 처리해줘야한다
             * 
             * */
             hourArr[24][0] = 24;
            if (checkParam(hours[0])) {
                hourArr[24][1] = 0;
            } else {
                hourArr[24][1] = hours[0];
            }
            return hourArr;
        }
    }
}
</script>
<style lang="">
    
</style>