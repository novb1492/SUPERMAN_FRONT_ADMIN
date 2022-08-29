<template>
    <li class="menu-li" @click="active">상품관리</li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goRegiProduct" v-if="role != 'USER'">상품등록</li>
    <li class="menu-detail-li" :class="{ 'active': flag  }" @click="goProductList">상품조회</li>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name: 'ProductNav',
    computed: {
        ...mapGetters("NavStore", {
            role: 'getRole'
        })
    },
    data() {
        return {
            flag: false
        };
    },
    methods: {
        goRegiProduct() {
            location.href = '/regi-product?storeid=' + this.$route.query.storeid + '&storeName=' + this.$route.query.storeName + '&addr=' + this.$route.query.addr;
        },
        goProductList() {
            location.href = '/product-list?page=1&category=0&storeid=' + this.$route.query.storeid + '&storeName=' + this.$route.query.storeName + '&addr=' + this.$route.query.addr;
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
