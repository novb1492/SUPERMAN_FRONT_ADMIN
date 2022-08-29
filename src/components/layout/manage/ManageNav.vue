<template>
  <nav class="nav">
    <div>
      <a href="javascript:void();">SUPERMAN</a>
    </div>
    <ul class="nav-menu-list">
      <ManageMainNav v-if="situataion == 0"></ManageMainNav>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import ManageMainNav from '@/components/layout/manage/ManageMainNav.vue';

export default
  {
    components: { ManageMainNav },
    name: 'ManageNav',
    computed: {
      ...mapGetters('NavStore', {
        situataion: 'getSituation'
      })
    }
  }
</script>


