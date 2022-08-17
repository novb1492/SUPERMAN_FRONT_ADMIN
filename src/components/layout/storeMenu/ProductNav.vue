<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            상품관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiProduct" v-if="role != 'USER'">상품등록</a>
            </li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goProductList">상품조회</a></li>
        </ul>
    </li>
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
    methods:{
        goRegiProduct(){
            location.href='/regi-product?storeid='+this.$route.query.id;
        },
        goProductList(){
            location.href='/product-list?page=1&category=all&storeid='+this.$route.query.id;
        }
    }
}
</script>
