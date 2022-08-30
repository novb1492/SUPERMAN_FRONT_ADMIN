<template>
    <ul class="menu-ul">
        <li class="menu-li" @click="active"> 매출관리</li>
        <ul class="menu-detail-ul" :class="{ 'active': flag }">
            <li @click="goRegiStore">월별매출</li>
            <li @click="goStoreList">일별매출</li>
            <li @click="goStoreList">전체매출</li>
        </ul>
    </ul>
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
