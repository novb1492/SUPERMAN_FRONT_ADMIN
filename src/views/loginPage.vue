<template>
  <div id="container">
        <div class="row">
           <div class="col"></div>
            <div class="col" style="margin-top: 100px;">
              <ul class="loginCenter">
                <li>이메일을 입력해 주세요</li>
                <li><input type="text" class="mb-2 " id="email" @keyup.enter="tryLogin" placeholder="email" v-model="email" ></li>
                <li>비밀번호를 입력해 주세요</li>
                <li><input type="password" class="center"  @keyup.enter="tryLogin" placeholder="password" id="pwd" v-model="pwd"></li>
                <li><input type="button" class="mt-3" @click="tryLogin" value="로그인"></li>
                <li><a href="/findAccountPage?scope=email" class="mr20">이메일 찾기</a><br><a href="/findAccountPage?scope=pwd">비밀번호 찾기</a></li>
              </ul>
            </div>
            <div class="col"></div>
        </div>
  </div>
</template>
<style scoped>
li{list-style:none;}
</style>
<script>
export default {
  name: 'loginPage',
  data() {
    return {
      email:null,
      pwd:null,
      nextUrl:localStorage.getItem('nextUrl'),
    }
  },
  computed: {
   
  },
  mounted(){
  },
  methods: {
    tryLogin(){
      this.$store.dispatch('basicStore/requestLogin',{email:this.email,pwd:this.pwd});
    }
  },
  
}
</script>

