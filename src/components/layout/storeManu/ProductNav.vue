<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            상품관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiStore">상품등록</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">상품조회</a></li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'ProductNav',
}
</script>
