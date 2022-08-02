<template>
    <p v-if="num == 1">
        <AdminNav></AdminNav>
    </p>
    <p v-else-if="num == 2">
        managenav
    </p>
    <p v-else>
        <UserNav></UserNav>
    </p>
</template>

<script>
import { getRole } from '@/assets/js/Jslib'
import AdminNav from '@/components/layout/admin/AdminNav.vue';
import UserNav from '@/components/layout/user/UserNav.vue';
export default {
    name: "NavBar",
    data() {
        return {
            num: 0,
        };
    },
    mounted() {
        let role = getRole();
        if (role == "ADMIN") {
            this.num = 1;
        }
        else if (role == "MANAGE") {
            this.num = 2;
        }
    },
    components: { AdminNav, UserNav }
}
</script>

<style>
</style>