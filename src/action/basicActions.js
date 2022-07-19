import {requestLogin  } from "../api/login/loginApi";
export default {
    requestLogin(context,payload) {
        console.log(payload);
        let data=JSON.stringify({
            "email":payload.email,
            "pwd":payload.pwd
        });
        requestLogin(data).then(response=>{
            console.log(response);
            context.dispatch('NavStore/changeLoginFlag',true,{ root: true });
        }).catch(error=>{
            console.log(error);
        });
    }
}