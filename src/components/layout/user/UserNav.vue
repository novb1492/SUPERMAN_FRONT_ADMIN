<template>
  <nav class="nav">
    <div>
      <a href="javascript:void();">SUPERMAN</a>
    </div>
    <ul class="nav-menu-list">
      <UserMainNav v-if="situataion == 0"></UserMainNav>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMainNav from '@/components/layout/user/UserMainNav.vue';

export default
  {
    components: { UserMainNav },
    name: 'UserNav',
    computed: {
      ...mapGetters('NavStore', {
        situataion: 'getSituation'
      })
    }
  }
</script>


