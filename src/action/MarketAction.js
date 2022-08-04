import { requestStoreListAtSimple } from "@/api/market/MarketApi"

export default {
    getStoreListSimple(context,page) {
        requestStoreListAtSimple(page).then(reseponse=>{
            context.commit('changeStoreList',reseponse.data);
        }).catch(error=>{
            console.log(error);
        });
    }
}