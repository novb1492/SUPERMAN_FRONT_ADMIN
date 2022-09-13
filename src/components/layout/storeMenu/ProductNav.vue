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
import { storeCommonQuery } from '@/assets/js/Jslib';
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
            location.href = `/regi-product?${storeCommonQuery(this.$route)}`;
        },
        goProductList() {
            location.href = `/product-list?page=1&category=0${storeCommonQuery(this.$route)}`;
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
