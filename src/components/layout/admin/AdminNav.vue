<template>
  <nav class="nav">
    <div class="nav-section">
      <a href="/">SUPERMAN</a>
      <i class="fa-solid fa-bars navtoggle" @click="active"></i>
    </div>
    <ul class="nav-menu-list" :class="{ 'active': flag }">
      <AdminMainNav v-if="situataion == 0"></AdminMainNav>
      <AdminStoreNav v-if="situataion == 1"></AdminStoreNav>
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
  data() {
    return {
      flag: false
    };
  },
  components: { AdminMainNav, AdminStoreNav },
  methods: {
    active() {
      if (this.flag) {
        this.flag = false;
        return;
      }
      this.flag = true;
    }
  }
}
</script>


