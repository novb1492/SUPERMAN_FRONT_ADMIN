<template>
    <ul class="menu-ul">
        <li class="menu-li" @click="active">상품관리</li>
        <ul class="menu-detail-ul" :class="{ 'active': flag }">
            <li @click="goRegiProduct" v-if="role != 'USER'">상품등록</li>
            <li @click="goProductList">상품조회</li>
        </ul>
    </ul>
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
