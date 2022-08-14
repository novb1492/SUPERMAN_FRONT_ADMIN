<template>
  <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand " href="/">
          <p class="pinkText">SUPERMAN</p>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <AdminMainNav></AdminMainNav>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminMainNav from './AdminMainNav.vue';

export default {
    name: 'AdminNav',
    computed: {
        ...mapGetters("NavStore", {
            situataion: "getSituation",
        })
    },
    components: { AdminMainNav }
}
</script>


