<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            주문관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goOrder(100)">완료된주문</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goOrder(1)">들어온주문</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goOrder(10)">취소된주문</a></li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'OrderNav',
    methods:{
        goOrder(num){
            location.href='/order-list?state='+num+'&page=1&&storeid='+this.$route.query.storeid+'&storeName='+this.$route.query.storeName+'&addr='+this.$route.query.addr+'&periodFlag=false';
        }
    }
}
</script>
