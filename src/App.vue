<template>
  <router-view></router-view>
  <nav-bar></nav-bar>
</template>

<script>
import NavBar from './components/layout/navBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
