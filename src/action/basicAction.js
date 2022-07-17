import {requestLogin  } from "../api/login/loginApi";
export default {
    requestLogin(context,data) {
        console.log(context);
        console.log(data);
        requestLogin().then(response=>{
            console.log(response);
        });
    }
}