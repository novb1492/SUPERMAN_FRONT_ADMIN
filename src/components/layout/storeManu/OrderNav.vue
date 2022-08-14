<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            주문관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiStore">완료된주문</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">들어온주문</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">취소된주문</a></li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'OrderNav',
}
</script>
