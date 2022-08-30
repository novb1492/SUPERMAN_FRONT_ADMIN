<template>
  <nav class="nav">
    <div class="nav-section">
      <a href="/">SUPERMAN</a>
      <i class="fa-solid fa-bars navtoggle" @click="active"></i>
    </div>
    <ul class="nav-menu-list-manage" :class="{ 'active': flag }">
      <ManageMainNav v-if="situataion == 0"></ManageMainNav>
      <ManageStoreNav v-if="situataion == 1"></ManageStoreNav>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import ManageMainNav from '@/components/layout/manage/ManageMainNav.vue';
import ManageStoreNav from './ManageStoreNav.vue';

export default
  {
    components: { ManageMainNav, ManageStoreNav },
    name: 'ManageNav',
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


