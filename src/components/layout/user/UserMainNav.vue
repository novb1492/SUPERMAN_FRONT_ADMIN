<template>
    <ShowState></ShowState>
    <StoreNav></StoreNav>
</template>

<script>
import StoreNav from '../mainMenu/StoreNav.vue';
import ShowState from '../ShowState.vue';

export default {
    name: "UserMainNav",
    components: { StoreNav, ShowState }
}
</script>
