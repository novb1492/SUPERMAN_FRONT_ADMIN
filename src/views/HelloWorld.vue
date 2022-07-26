<template>
  <kakao-map :width="1000" :height="1000" :resizeWidth="1000" :resizeHeight="1000"></kakao-map>
  <ck5-editor :idName="'editor'"></ck5-editor>
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue"
import Ck5Editor from "@/components/Ck5Editor.vue";

export default {
  components: { KakaoMap, Ck5Editor },
  name: 'HelloWorld',
}
</script>

