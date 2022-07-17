<template>
  <div id="container">
      <short-logo/>
        <ul class="loginCenter">
          <li>이메일을 입력해 주세요</li>
          <li><input type="text" class="mb-2 " id="email" @keyup.enter="tryLogin" placeholder="email"></li>
          <li>비밀번호를 입력해 주세요</li>
          <li><input type="password" class="center"  @keyup.enter="tryLogin" placeholder="password" id="pwd"></li>
            <li><input type="button" class="mt-3" @click="tryLogin" value="로그인"></li>
              <li><input type="button" class="mb-3 mt-3 mr20" @click="soLogin('naver')" value="네이버로그인"><input type="button" @click="soLogin('kakao')" value="카카오로그인"></li>
                <li><a href="/findAccountPage?scope=email" class="mr20">이메일 찾기</a><a href="/findAccountPage?scope=pwd">비밀번호 찾기</a></li>
        </ul>
      <br>
      <br>
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
        
    }
  },
  computed: {
   
  },
  mounted(){

  },
  
}
</script>

