<template>
    <ShowState></ShowState>
    <StoreNav></StoreNav> 
    <EmployeeNav></EmployeeNav>
    <CompanyNav></CompanyNav> 
</template>

<script>
import StoreNav from '../mainMenu/StoreNav.vue';
import EmployeeNav from '../mainMenu/EmployeeNav.vue';
import ShowState from '../ShowState.vue';
import CompanyNav from '../mainMenu/CompanyNav.vue';

export default {
    name: "AdminMainNav",
    components: { ShowState, StoreNav, EmployeeNav, CompanyNav }
}
</script>
