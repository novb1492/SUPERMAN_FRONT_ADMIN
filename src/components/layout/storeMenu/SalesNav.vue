<template>
    <li class="menu-li" @click="active"> 매출관리</li>
    <li class="menu-detail-li" :class="{ 'active': flag }" @click="goRegiStore">월별매출</li>
    <li class="menu-detail-li" :class="{ 'active': flag }" @click="goStoreList">일별매출</li>
    <li class="menu-detail-li" :class="{ 'active': flag }" @click="goStoreList">전체매출</li>

</template>

<script>

export default {
    name: 'SalesNav',
    data() {
        return {
            flag: false
        };
    },
    methods: {
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
