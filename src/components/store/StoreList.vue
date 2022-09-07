<template lang="">
        <li> <a href="javascript:void();" @click="goDetailPage()">
            <img :src="info.imgPath" />
            <p>매장명:{{ info.name }}</p>
            <p>주소:{{ info.address }}</p>
            <p v-if="info.state == 1">
                영업중
            </p>
            <p v-else-if="info.state == 0">
                영업종료
            </p>
            <p v-else-if="info.state == 40">
                폐업
            </p>
        </a>
    </li>
   
</template>
<script>
export default {
    props: ['info','storeid'],
    methods:{
        goDetailPage() {
            location.href = '/store-detail?storeid=' +this.storeid;
        },
    }
}
</script>
<style lang="">
    
</style>