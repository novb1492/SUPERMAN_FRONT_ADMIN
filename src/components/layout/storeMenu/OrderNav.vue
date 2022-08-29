<template>
    <li class="menu-li" @click="active">주문관리 </li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goOrder(100)">완료된주문</li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goOrder(1)">들어온주문</li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goOrder(10)">취소된주문</li>
</template>

<script>

export default {
    name: 'OrderNav',
    methods: {
        goOrder(num) {
            location.href = '/order-list?state=' + num + '&page=1&&storeid=' + this.$route.query.storeid + '&storeName=' + this.$route.query.storeName + '&addr=' + this.$route.query.addr + '&periodFlag=false';
        },
        active() {
            if (this.flag) {
                this.flag = false;
                return;
            }
            this.flag = true;
        }
    },
    data() {
        return {
            flag: false
        };
    }
}
</script>
