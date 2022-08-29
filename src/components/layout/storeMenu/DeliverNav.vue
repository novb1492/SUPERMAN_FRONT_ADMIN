<template>
    <li class="menu-li" @click="active">배달관리</li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goDeliverList(100)">완료된배달</li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goDeliverList(1)">진행중배달</li>
</template>

<script>

export default {
    name: 'DeliverNav',
    data() {
        return {
            flag: false
        };
    },
    methods: {
        goDeliverList(num) {
            location.href = '/deliver-list?page=1&state=' + num + '&storeid=' + this.$route.query.storeid + '&storeName=' + this.$route.query.storeName + '&addr=' + this.$route.query.addr;
        },
        active() {
            if (this.flag) {
                this.flag = false;
                return;
            }
            this.flag = true;
        }
    }
}
</script>
