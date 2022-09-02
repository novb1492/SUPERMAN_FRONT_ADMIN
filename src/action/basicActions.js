import { requestListInfo } from "@/api/Etc/EtcApi";
import {requestLogin  } from "@/api/login/loginApi";
import {  setInfo, checkNew, errorHandle} from "@/assets/js/Jslib";
export default {
    requestLogin(context,payload) {
        let data=JSON.stringify({
            "userId":payload.email,
            "pwd":payload.pwd
        });
        requestLogin(data).then(response=>{
            setInfo(response);
            context.dispatch('NavStore/changeLoginFlag',true,{ root: true });
            let nextUrl=payload.nextUrl;
            if(nextUrl==undefined||nextUrl==null||nextUrl=='null'||nextUrl=='undefined'){
                location.href='/';
                return;
            }
            let url=nextUrl.replace('*','?');
            console.log(url);
            location.href=url.replaceAll('^','&');
        }).catch(error=>{
            errorHandle(error);
        });
    },
    getInfolist(context, payload) {
        requestListInfo(payload.url).then(response => {
            getDone(context,response);
        }).catch(error => {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestListInfo(payload.url).then(response => {
                    getDone(context,response);
                }).catch(error => {
                   errorHandle(error);
                });
            } else {
               errorHandle(error);
            }
        });
    }
}
function getDone(context,response) {
    context.commit('changePaginList', response.data);
}
