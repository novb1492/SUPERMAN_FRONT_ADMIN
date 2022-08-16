<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            배달관리
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="javascript:void();" @click="goRegiStore">완료된배달</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">진행중배달</a></li>
            <li><a class="dropdown-item" href="javascript:void();" @click="goStoreList">취소된배달</a></li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'DeliverNav',
}
</script>
