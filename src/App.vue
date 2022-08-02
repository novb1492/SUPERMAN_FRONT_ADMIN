<template>
<NavBar></NavBar>
  <router-view></router-view>
</template>

<script>
import NavBar from "@/views/layout/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar
}
    
}
</script>
