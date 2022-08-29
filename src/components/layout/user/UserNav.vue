<template>
  <nav class="nav">
    <div class="nav-section">
      <a href="javascript:void();">SUPERMAN</a>
      <i class="fa-solid fa-bars navtoggle nav-section-icon" @click="active"></i>
    </div>
    <ul class="nav-menu-list" :class="{ 'active': flag }">
      <UserMainNav v-if="situataion == 0"></UserMainNav>
      <UserStoreNav v-if="situataion == 1"></UserStoreNav>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMainNav from '@/components/layout/user/UserMainNav.vue';
import UserStoreNav from './UserStoreNav.vue';

export default
  {
    components: { UserMainNav, UserStoreNav },
    name: 'UserNav',
    computed: {
      ...mapGetters('NavStore', {
        situataion: 'getSituation'
      })
    },
    data() {
      return {
        flag: false
      };
    },
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


