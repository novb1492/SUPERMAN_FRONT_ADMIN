<template>
 <P v-if="situataion==0">
   <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand "  href="/"><p class="pinkText">SUPERMAN</p></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
         <!-- <a class="nav-link active" aria-current="page" href="javascript:void();" @click="test">배달시작</a>-->
        </li>
        <li class="nav-item" v-if="!loginFlag">
          <a class="nav-link" href="javascript:void();">로그인</a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link" href="javascript:void();">로그아웃</a>
        </li>              
        <li class="nav-item">
          <a class="nav-link disabled" href="javascript:void();" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
  </P>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'navBar',
  computed: {
    ...mapGetters('NavStore',{
      situataion: 'getSituation',
      loginFlag: 'getLoginFlag',
    })
  },
  components: {
  },
}
</script>


