<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
</template>

<script>
import NavBar from '@/components/layout/navBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
