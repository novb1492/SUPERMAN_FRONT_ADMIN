<template>
  <div style="margin-top: 70px;"></div>
  <button @click="test">배달시작</button>
  <button @click="connect2">손님이배달조회</button>
  <button @click="success2">배달위치전송</button>

  <!-- 인코딩 euc-kr 필수 -->
  <form name="mobileweb" method="post" accept-charset="euc-kr">
    <!--*************************필수 세팅 부분************************************-->
    <!-- 리턴받는 가맹점 URL 세팅 -->
    <input type="text" name="P_NEXT_URL" value="http://localhost:8080/kg" hidden>
    <!-- 지불수단 선택 (신용카드,계좌이체,가상계좌,휴대폰) -->
    <input type="text" name="P_INI_PAYMENT" value="CARD" hidden>
    <!-- 복합/옵션 파라미터 -->
    <input type="text" name="P_RESERVED" value="twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N" hidden>
    <!-- 에스크로옵션 : useescrow=Y -->
    <input type="text" name="P_MID" value="INIpayTest" hidden> <!-- 에스크로테스트 : iniescrow0, 모바일빌링(정기과금)은 별도연동필요 -->
    <input type="text" name="P_OID" value="test_oid_123456" hidden>
    <input type="text" name="P_GOODS" value="테스트상품" hidden>
    <input type="text" name="P_AMT" value="1004" hidden>
    <input type="text" name="P_UNAME" value="테스터" hidden>
    <!--*************************선택 필수 세팅 부분************************************-->
    <!-- 가상계좌 입금 노티 사용시 필수 -->
    <input type="text" name="P_NOTI_URL" value="" hidden>
    <!-- 휴대폰결제 필수 [1:컨텐츠, 2:실물] -->
    <input type="text" name="P_HPP_METHOD" value="1" hidden>
    <input type="button" name="pay" value="결제" @click="on_pay">
  </form>
  <input type="button" value="결제취소" @click="cancel" />
  {{ kgResponse }}
</template>

<script>
import { getParam } from "@/assets/js/Jslib";
export default {
  name: 'HelloWorld',
  data() {
    return {
      kgResponse: null,
      websocket: null,
      websocket2: null
    }
  },
  mounted() {
    this.tt = navigator.userAgent;
    this.$store.dispatch('NavStore/changeSituation', 0);
    this.connect();
  },
  methods: {
    cancel() {
      var requestUrl = 'http://localhost:8080' + '/test/kgFail/' + getParam('tid');
      console.log(requestUrl);
      // getRequest(requestUrl, this.headers).then(response => {
      //   this.kgResponse = response;
      // })
    },
    on_pay() {
      var myform = document.mobileweb;
      myform.action = "https://mobile.inicis.com/smart/payment/";
      myform.target = "_self";
      myform.submit();
    },
    connect() {
      this.websocket = new WebSocket("ws://localhost:8080/ws/deliver?roomid=4&role=ADMIN");
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
    connect2() {
      this.websocket2 = new WebSocket("ws://localhost:8080/ws/deliver?roomid=4&role=USER");
      this.websocket2.onopen = e => {
        console.log(e);
        //추후 검증 로직 추가
      };
      this.websocket2.onmessage = function (event) {
        console.log(event.data);
      };
      this.websocket2.onerror = function (error) {
        console.log(error);
      }.bind(this);
      this.websocket2.onclose = function (event) {
        console.log(event);
      }.bind(this);
    },
    test() {
      var options2 = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.watchPosition(this.success, this.error, options2);
      // let data = JSON.stringify({
      //   "x": 100,
      //   "y": 20,
      //   "roomid": 4
      // })
      // this.websocket.send(data);
    },
    success(position) {
      var lat = position.coords.latitude;// 위도
      var lon = position.coords.longitude; // 경도
      let data = JSON.stringify({
        "latitude": lat,
        "longitude": lon,
        "roomid": 4
      })

      this.websocket.send(data);
    },
    success2() {
      var lat =100
      var lon = 200
      let data = JSON.stringify({
        "latitude": lat,
        "longitude": lon,
        "roomid": 4
      })

      this.websocket.send(data);
    },
    error() {
      alert('위치정보를 가져올 수 없습니다');
    }
  }
}
</script>

