<template>
  <div style="margin-top: 70px;"></div>
  <button @click="connect2">손님이배달조회</button>
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

  백엔드가 ec2에 미인증 https사용중이여서
  <br>
  통신시 net::ERR_CERT_AUTHORITY_INVALID가 발생합니다
  <br>
  크롬에서 https://43.200.77.18:8080 검색후 
  <br>
  안전하지 않지만 허용 클릭후 테스트 해주세요
</template>

<script>
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
    this.$store.dispatch('NavStore/changeSituation', 0);
  },
  methods: {
    on_pay() {
      var myform = document.mobileweb;
      myform.action = "https://mobile.inicis.com/smart/payment/";
      myform.target = "_self";
      myform.submit();
    },
    connect2() {
      //임시
      let info = JSON.parse(localStorage.getItem('info'));
      var temp=0;
      if(info.role=='MANAGE'){
        temp=1;
      }else{
        temp=2;
      }
      //---------------------------------------------------------
      this.websocket2 = new WebSocket("wss://localhost:8080/ws/deliver?roomid=7&role=USER&deliverDetailId="+temp);
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
  }
}
</script>

