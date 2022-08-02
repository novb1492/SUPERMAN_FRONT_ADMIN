<template>

  <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <user-main-nav v-if="situataion == 0"></user-main-nav>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMainNav from './UserMainNav.vue';

export default
  {
    components: { UserMainNav },
    name: 'ManageNav',
    computed: {
      ...mapGetters('NavStore', {
        situataion: 'getSituation'
      })
    }
  }
</script>


