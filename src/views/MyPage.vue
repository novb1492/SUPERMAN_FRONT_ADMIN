<template>
  <div style="margin-top: 100px;">
    <button @click="upsertLocalLogin">생체 인증 수단 등록/수정</button>
  </div>
</template>

<script>
const createCredentialDefaultArgs = {
  publicKey: {
    // Relying Party (a.k.a. - Service):
    rp: {
      name: "Acme"
    },

    // User:
    user: {
      id: new Uint8Array(16),
      name: '',
      displayName: ""
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
};
// sample arguments for login
const getCredentialDefaultArgs = {
  publicKey: {
    timeout: 60000,
    // allowCredentials: [newCredential] // see below
    challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
      0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
      0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
    ]).buffer
  },
};
export default {
    methods:{
        upsertLocalLogin(){
            //지문 등록 할때는 create
            // register / create a new credential
            navigator.credentials.create(createCredentialDefaultArgs)
                .then((cred) => {
                console.log("NEW CREDENTIAL", cred);
                const idList = [{
                    id: cred.rawId,
                    transports: ["usb", "nfc", "ble"],
                    type: "public-key"
                }];
                console.log(idList);
                // getCredentialDefaultArgs.publicKey.allowCredentials = idList;
                this.$router.go();
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
             //지문으로 로그인 할때는 get
            navigator.credentials.get(getCredentialDefaultArgs).then((assertion) => {
                this.assertions = assertion;
                alert(assertion.id);
                console.log("ASSERTIONs", assertion);
            }).catch((err) => {
                this.errs = err;
                console.log("ERROR", err);
            });
        }
    }
}
</script>

<style>

</style>