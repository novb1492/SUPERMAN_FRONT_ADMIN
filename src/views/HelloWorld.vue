<template>
  <kakao-map :width="1000" :height="1000" :resizeWidth="1000" :resizeHeight="1000"></kakao-map>
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
  {{kgResponse}}
</template>

<script>
import { getParam } from "@/assets/js/Jslib";
import KakaoMap from "@/components/KakaoMap.vue"
export default {
  components: { KakaoMap },
  name: 'HelloWorld',
  data() {
    return {
      kgResponse: null
    }
  },
  mounted() {
    this.tt = navigator.userAgent;
    this.$store.dispatch('NavStore/changeSituation', 0);
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
  }
}
</script>

