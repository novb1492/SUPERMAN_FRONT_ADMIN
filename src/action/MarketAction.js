import { requestStoreListAtSimple } from "@/api/market/MarketApi"
import { checkNew } from "@/assets/js/Jslib";

export default {
    getStoreListSimple(context,page) {
        requestStoreListAtSimple(page).then(reseponse=>{
            context.commit('changeStoreList',reseponse.data);
        }).catch(error=>{
            let response=error.response;
            let responseData=response.data;
            if (checkNew(response.status,responseData.message)) {
                requestStoreListAtSimple(page).then(reseponse => {
                    context.commit('changeStoreList',reseponse.data);
                }).catch(() => {
                    alert('정보를 불러오는데 실패했습니다');
                });
              }else{
                alert('정보를 불러오는데 실패했습니다');
              }
        });
    }
}