import { requestStoreListAtSimple,requestStoreList } from "@/api/market/MarketApi"
import { checkNew } from "@/assets/js/Jslib";

export default {
    getStoreListSimple(context,page) {
        requestStoreListAtSimple(page).then(response=>{
            context.commit('changeStoreList',response.data);
        }).catch(error=>{
            let response=error.response;
            let responseData=response.data;
            if (checkNew(response.status,responseData.message)) {
                requestStoreListAtSimple(page).then(response => {
                    context.commit('changeStoreList',response.data);
                }).catch(() => {
                    alert('정보를 불러오는데 실패했습니다');
                });
              }else{
                alert('정보를 불러오는데 실패했습니다');
              }
        });
    },
    getStoreByRole(context,payload){
        payload=JSON.parse(payload);
        let role=payload.role;
        let page=payload.page;
        let keyword=payload.keyword;
        requestStoreList(role,page,keyword).then(response=>{
            context.commit('changeStoreList',response.data);
        }).catch(error=>{
            let response=error.response;
            let responseData=response.data;
            if (checkNew(response.status,responseData.message)) {
                requestStoreList(role,page,keyword).then(response => {
                    context.commit('changeStoreList',response.data);
                }).catch(() => {
                    alert('정보를 불러오는데 실패했습니다');
                });
              }else{
                alert('정보를 불러오는데 실패했습니다');
              }
        });
    }
}