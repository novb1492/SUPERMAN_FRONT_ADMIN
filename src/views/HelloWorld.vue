<template>
  <kakao-map :width="1000" :height="1000" :resizeWidth="1000" :resizeHeight="1000" ></kakao-map>
  {{tt}}
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue"
export default  {
  components: { KakaoMap },
  name: 'HelloWorld',
  data() {
    return {
      tt:null
    }
  },
  mounted(){
    this.tt=navigator.userAgent;

  }
}
</script>

