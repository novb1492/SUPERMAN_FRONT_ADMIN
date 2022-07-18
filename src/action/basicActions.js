import {requestLogin  } from "../api/login/loginApi";
export default {
    requestLogin(context,payload) {
        console.log(payload);
        requestLogin().then(response=>{
            console.log(response);
        });
    }
}