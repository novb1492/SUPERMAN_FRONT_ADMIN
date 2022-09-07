<template lang="">
        <li >
            <a href="javascript:void();" @click="goDetail">
              <img :src="info.imgPath" />
              <p>{{ info.name }}</p>
              <p>{{ info.price }}원</p>
              <p v-if="info.state == 1">
                판매중
              </p>
              <p v-else-if="info.state == 0">
                품절
              </p>
              <p v-else-if="info.state == 30">
                판매중단
              </p>
            </a>
          </li>
  
</template>
<script>
export default {
    props: ['info'],
    methods:{
        goDetail(){
            alert('미구현기능입니다')
        }
    }
}
</script>
<style lang="">
    
</style>