<template >
    <div style="margin-top: 70px;">
        <div v-for="(deliverDetail, index) in deliverDetailArr" :key="index">
            {{ deliverDetail }}
            <button @click="cancel(deliverDetail.deliverDetailId)">배달취소</button>
            <button @click="done(deliverDetail.deliverDetailId, storeId, 'done')">배달완료</button>
        </div>
        <button @click="cancelAll">배달전체취소</button>
        <button @click="start">배달시작</button>
        <button @click="success2">배달위치전송</button>
    </div>
</template>
<script>
import { requestGetDetail, requestChangeState, requestDeliverDetailState } from "@/api/deliver/DeliverApi";
import { checkNew, showStoreInfo } from "@/assets/js/Jslib";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            storeId: this.$route.query.storeid,
            deliverId: this.$route.query.deliverid,
            deliverDetailArr: [],
            websocket: null
        }
    },
    watch: {
        'deliverDetailArr'() {
            if (this.deliverDetailArr.length > 0) {
                this.connect();
            }
        }
    },
    mounted() {
        this.$store.dispatch('NavStore/changeSituation', 1);
        showStoreInfo(this.$route.query.addr, this.$route.query.storeName, this.changeShowMarketInfo);
        this.requestGet();
    },
    methods: {
        done(deliverDetailId){
            let requestData = JSON.stringify({
                "state": 100,
                "deliverDetailId":deliverDetailId,
                "storeId":this.storeId,
                "deliverId":this.deliverId
            });
            requestDeliverDetailState(requestData).then(response=>{
                this.successDone(response.data,deliverDetailId);
            }).catch(error=>{
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestDeliverDetailState(requestData).then(response => {
                        this.successDone(response.data,deliverDetailId);
                    }).catch(error => {
                        this.errorGet(error);
                    });
                } else {
                    this.errorGet(error);
                }
            });
        },
        successDone(data,deliverDetailId){
            let requestData = JSON.stringify({
                "state": 'done',
                "deliverDetailId":deliverDetailId,
                "roomid":this.deliverId
            });
            this.websocket.send(requestData);
            alert(data.message);
        },
        cancel(deliverDetailId){
            let requestData = JSON.stringify({
                "state": 10,
                "deliverDetailId":deliverDetailId,
                "storeId":this.storeId,
                "deliverId":this.deliverId
            });
            requestDeliverDetailState(requestData).then(response=>{
                this.doneCancel(response.data,deliverDetailId);
            }).catch(error=>{
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestDeliverDetailState(requestData).then(response => {
                        this.doneCancel(response.data,deliverDetailId);
                    }).catch(error => {
                        this.errorGet(error);
                    });
                } else {
                    this.errorGet(error);
                }
            });
        },
        doneCancel(data,deliverDetailId){
            let requestData = JSON.stringify({
                "state": 'cancel',
                "deliverDetailId":deliverDetailId,
                "roomid":this.deliverId
            });
            this.websocket.send(requestData);
            alert(data.message);
        },
        cancelAll() {
            let data = JSON.stringify({
                "state": 10,
                "deliverId": this.deliverId,
                "storeId": this.storeId
            });
            requestChangeState(data).then(response => {
                this.doneCancelAll(response.data);
            }).catch(error => {
                console.log(error);
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestChangeState(data).then(response => {
                        this.doneCancelAll(response.data);
                    }).catch(error => {
                        this.errorGet(error);
                    });
                } else {
                    this.errorGet(error);
                }
            })
        },
        doneCancelAll(data) {
            let rqeuestdata = JSON.stringify({
                "roomid": this.deliverId,
                "state": 'cancelAll',
                "storeId": this.storeId
            })
            this.websocket.send(rqeuestdata);
            alert(data.message);
        },
        connect() {
            let authentications = JSON.parse(localStorage.getItem('authentication'))
            this.websocket = new WebSocket("ws://localhost:8080/ws/deliver?roomid=" + this.deliverId + "&role=ADMIN&access=" + authentications.authentication + '&refresh=' + authentications.refresh + '&storeId=' + this.storeId);
            this.websocket.onopen = e => {
                console.log(e);
                //추후 검증 로직 추가
            };
            this.websocket.onmessage = function (event) {
                console.log(event.data);
            };
            this.websocket.onerror = function (error) {
                console.log(error);
            }.bind(this);
            this.websocket.onclose = function (event) {
                console.log(event);
            }.bind(this);
        },
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        requestGet() {
            requestGetDetail({ storeId: this.storeId, deliverId: this.deliverId }).then(response => {
                this.getDone(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestGetDetail({ storeId: this.storeId, deliverId: this.deliverId }).then(response => {
                        this.getDone(response.data);
                    }).catch(error => {
                        this.errorGet(error);
                    });
                } else {
                    this.errorGet(error);
                }
            })
        },
        getDone(data) {
            this.deliverDetailArr = data;
        },
        cancle(deliverId) {
            alert(deliverId);
        },
        start() {
            let data = JSON.stringify({
                "state": 20,
                "deliverId": this.deliverId,
                "storeId": this.storeId
            })
            requestChangeState(data).then(response => {
                this.doneStart(response.data);
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestChangeState(data).then(response => {
                        this.doneStart(response.data);
                    }).catch(error => {
                        this.errorGet(error);
                    });
                } else {
                    this.errorGet(error);
                }
            })
        },
        doneStart(data) {
            var options2 = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            navigator.geolocation.watchPosition(this.success, this.error, options2);
            alert(data.message);
        },
        success(position) {
            var lat = position.coords.latitude;// 위도
            var lon = position.coords.longitude; // 경도
            let data = JSON.stringify({
                "latitude": lat,
                "longitude": lon,
                "roomid": this.deliverId,
                "state": 'start',
                "storeId": this.storeId
            })

            this.websocket.send(data);
        },
        success2() {
            var lat = 100
            var lon = 200
            let data = JSON.stringify({
                "latitude": lat,
                "longitude": lon,
                "roomid": this.deliverId,
                "storeId": this.storeId,
                "state": 'start'
            })
            this.websocket.send(data);
        },
        error() {
            alert('위치정보를 가져올 수 없습니다');
        },
        changeState(deliverId, storeId, state) {
            this.websocket.send({ state: state, deliverId: deliverId, storeId: storeId });
        }
    }
}
</script>
<style >
</style>