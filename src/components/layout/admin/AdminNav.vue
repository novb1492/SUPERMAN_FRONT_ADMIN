<template>
  <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <main-nav v-if="situataion == 0"></main-nav>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MainNav from './MainNav.vue';

export default {
  components: { MainNav },
  name:
    MainNav,
  computed: {
    ...mapGetters('NavStore', {
      situataion: 'getSituation',
    })
  }
}
</script>


