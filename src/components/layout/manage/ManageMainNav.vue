<template>
    <ShowState></ShowState>
    <StoreNav></StoreNav>
    <EmployeeNav></EmployeeNav>
</template>

<script>
import StoreNav from '../mainMenu/StoreNav.vue';
import EmployeeNav from '../mainMenu/EmployeeNav.vue';
import ShowState from '../ShowState.vue';

export default {
    name: "ManageMainNav",
    components: { StoreNav, EmployeeNav, ShowState }
}
</script>
