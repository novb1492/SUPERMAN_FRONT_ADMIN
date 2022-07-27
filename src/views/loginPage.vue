<template>
  <div id="container">
    <div class="row">
      <div class="col"></div>
      <div class="col" style="margin-top: 100px;">
        <ul class="loginCenter">
          <li>이메일을 입력해 주세요</li>
          <li><input type="text" class="mb-2 " id="email" @keyup.enter="tryLogin" placeholder="email" v-model="email">
          </li>
          <li>비밀번호를 입력해 주세요</li>
          <li><input type="password" class="center" @keyup.enter="tryLogin" placeholder="password" id="pwd"
              v-model="pwd"></li>
          <li><input type="button" class="mt-3" @click="tryLogin" value="로그인"></li>
          <li><a href="/findAccountPage?scope=email" class="mr20">이메일 찾기</a><br><a
              href="/findAccountPage?scope=pwd">비밀번호 찾기</a></li>
          <li><button @click="localLogin">로컬 로그인 하기</button></li>
          <li><button @click="temp">지문등록</button></li>
        </ul>
      </div>
      <div class="col"></div>
    </div>
  </div>
  {{assertions}}
    {{errs}}
test
</template>
<style scoped>
li {
  list-style: none;
}
</style>
<script>
export default {
  name: 'loginPage',
  data() {
    return {
      email: null,
      pwd: null,
      assertions:null,
      errs:null,
      getCredentialDefaultArgs: {
        publicKey: {
          timeout: 60000,
          // allowCredentials: [newCredential] // see below
          challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
            0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
            0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
          ]).buffer
        },
      },
    }
  },
  methods: {
    tryLogin() {
      this.$store.dispatch('basicStore/requestLogin', { email: this.email, pwd: this.pwd, nextUrl: this.$route.query.nextUrl });
    },
    temp(){
      //지문 등록 할때는 create
      // register / create a new credential
      // this.createCredentialDefaultArgs.user.name=this.email;
      console.log(this.temp2());
      navigator.credentials.create(this.temp2())
        .then((cred) => {
          console.log("NEW CREDENTIAL", cred);

          // normally the credential IDs available for an account would come from a server
          // but we can just copy them from above…
          const idList = [{
            id: cred.rawId,
            transports: ["usb", "nfc", "ble"],
            type: "public-key"
          }];
          this.getCredentialDefaultArgs.publicKey.allowCredentials = idList;
          // return navigator.credentials.get(this.getCredentialDefaultArgs);
        })
        // .then((assertion) => {
        //   alert('a');
        //   this.assertions=assertion;
        //   console.log("ASSERTIONs", assertion);
        // })
        .catch((err) => {
          this.errs=err;
          console.log("ERROR", err);
        });
    },
    localLogin() {
        //지문으로 로그인 할때는 get
        navigator.credentials.get(this.getCredentialDefaultArgs).then((assertion) => {
          this.assertions=assertion;
          console.log("ASSERTIONs", assertion);
        })  .catch((err) => {
          this.errs=err;
          console.log("ERROR", err);
        });
    },
    temp2(){
      const createCredentialDefaultArgs= {
        publicKey: {
          // Relying Party (a.k.a. - Service):
          rp: {
            name: "Acme"
          },

          // User:
          user: {
            id: new Uint8Array(16),
            name: this.email,
            displayName: "John P. Smith"
          },

          pubKeyCredParams: [{
            type: "public-key",
            alg: -7
          }],

          attestation: "direct",

          timeout: 60000,

          challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
            0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
            0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
          ]).buffer
        }
      }
      return createCredentialDefaultArgs;
    }
  }
}
</script>

