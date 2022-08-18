import { requestListInfo } from "@/api/Etc/EtcApi";
import {requestLogin  } from "@/api/login/loginApi";
import {  setToken,setInfo, checkNew} from "@/assets/js/Jslib";
export default {
    requestLogin(context,payload) {
        console.log(payload);
        let data=JSON.stringify({
            "userId":payload.email,
            "pwd":payload.pwd
        });
        requestLogin(data).then(response=>{
            console.log(response);
            setToken(response);
            setInfo(response);
            context.dispatch('NavStore/changeLoginFlag',true,{ root: true });
            let nextUrl=payload.nextUrl;
            if(nextUrl==undefined||nextUrl==null||nextUrl=='null'||nextUrl=='undefined'){
                location.href='/';
                return;
            }
            let url=nextUrl.replace('*','?');
            location.href=url.replaceAll('^','&');
        }).catch(error=>{
            let resposne=error.response;
            let data=resposne.data.data;
            alert(data.message);
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
                }).catch(() => {
                    alert('정보를 불러오는데 실패했습니다');
                });
            } else {
                alert('정보를 불러오는데 실패했습니다');
            }
        });
    }
}
function getDone(context,response) {
    context.commit('changePaginList', response.data);
}