import {requestLogin  } from "../api/login/loginApi";
export default {
    requestLogin(context,payload) {
        console.log(payload);
        let data=JSON.stringify({
            "userId":payload.email,
            "pwd":payload.pwd
        });
        requestLogin(data).then(response=>{
            console.log(response);
            context.dispatch('NavStore/changeLoginFlag',true,{ root: true });
            let nextUrl=payload.nextUrl;
            if(nextUrl==undefined||nextUrl==null||nextUrl=='null'||nextUrl=='undefined'){
                location.href='/';
                return;
            }
            location.href=nextUrl;

        }).catch(error=>{
            console.log(error);
            let resposne=error.response;
            let data=resposne.data.data;
            alert(data.message);
        });
    }
}