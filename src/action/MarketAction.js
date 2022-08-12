import { requestStoreListAtSimple, requestStoreList, requestStoreInfo } from "@/api/market/MarketApi"
import { checkNew, failGetStoreList } from "@/assets/js/Jslib";

export default {
    getStoreListSimple(context, page) {
        requestStoreListAtSimple(page).then(response => {
            context.commit('changeStoreList', response.data);
        }).catch(error => {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestStoreListAtSimple(page).then(response => {
                    context.commit('changeStoreList', response.data);
                }).catch(() => {
                    alert('정보를 불러오는데 실패했습니다');
                });
            } else {
                alert('정보를 불러오는데 실패했습니다');
            }
        });
    },
    getStoreByRole(context, payload) {
        payload = JSON.parse(payload);
        let role = payload.role;
        let page = payload.page;
        let keyword = payload.keyword;
        let category = payload.category;
        requestStoreList(role, page, keyword, category).then(response => {
            context.commit('changeStoreList', response.data);
        }).catch(error => {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestStoreList(role, page, keyword, category).then(response => {
                    context.commit('changeStoreList', response.data);
                }).catch(error => {
                    failGetStoreList(error);
                });
            } else {
                failGetStoreList(error);
            }
        });
    },
    getStoreInfo(context, payload) {
        let id = payload.id;
        requestStoreInfo(id).then(response => {
            doneGetInfo(response,context);
        }).catch(error => {
            let response = error.response;
            let data = response.data;
            if (checkNew(response.status, data.message)) {
                requestStoreInfo(id).then(response => {
                    doneGetInfo(response,context);
                }).catch(error => {
                    getInfoError(error);
                });
            }
            else {
                getInfoError(error);
            }
        });
    },
    setAddr(context,value){
        context.commit('changeAddr', value);
    },
    setName(context,value){
        context.commit('changeName', value);
    },
    setThumbnail(context,value){
        context.commit('changeThumbNail', value);
    }

}
function doneGetInfo(response, context) {
    context.commit('changeStoreInfo', response.data);
}
function getInfoError(error) {
    let response = error.response;
    alert(response.data.message);
}