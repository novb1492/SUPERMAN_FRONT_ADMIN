<template>
  <nav class="nav">
    <div>
      <a href="javascript:void();">SUPERMAN</a>
    </div>
    <ul class="nav-menu-list">
      <AdminMainNav v-if="situataion == 0"></AdminMainNav>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminMainNav from './AdminMainNav.vue';

export default {
  name: "AdminNav",
  computed: {
    ...mapGetters("NavStore", {
      situataion: "getSituation",
    })
  },
  components: { AdminMainNav }
}
</script>


