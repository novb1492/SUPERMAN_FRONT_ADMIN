<template>
  <nav class="nav">
    <div>
      <a href="javascript:void();">SUPERMAN</a>
    </div>
    <ul class="nav-menu-list">
      <AdminMainNav v-if="situataion == 0"></AdminMainNav>
      <AdminStoreNav  v-if="situataion==1"></AdminStoreNav>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminMainNav from './AdminMainNav.vue';
import AdminStoreNav from './AdminStoreNav.vue';

export default {
  name: "AdminNav",
  computed: {
    ...mapGetters("NavStore", {
      situataion: "getSituation",
    })
  },
  components: { AdminMainNav, AdminStoreNav }
}
</script>


