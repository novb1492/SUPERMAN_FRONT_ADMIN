<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            배달관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goDeliverList(100)">완료된배달</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goDeliverList(1)">진행중배달</a></li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'DeliverNav',
    methods:{
        goDeliverList(num){
            location.href='/deliver-list?page=1&state='+num+'&storeid='+this.$route.query.storeid+'&storeName='+this.$route.query.storeName+'&addr='+this.$route.query.addr;
        }
    }
}
</script>
