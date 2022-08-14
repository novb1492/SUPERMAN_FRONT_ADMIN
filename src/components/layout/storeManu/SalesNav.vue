<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            주문관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiStore">월별매출</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">일별매출</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">전체매출</a></li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'SalesNav',
}
</script>
