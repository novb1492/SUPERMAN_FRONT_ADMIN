import { requestStoreListAtSimple, requestStoreList, requestStoreInfo } from "@/api/market/MarketApi"
import { checkNew, failGetStoreList, show400ErrorList } from "@/assets/js/Jslib";

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
    },
    setOpentime(context,value){
        context.commit('changeOpentime', value);
    },
    setDetailAddr(context,value) {
        context.commit('changeDetailAddr', value);
    },
    setPostcode(context,value) {
        context.commit('changePostcode', value);
    },
    setCompanynum(context,value) {
        context.commit('changeCompanynum', value);
    },
    setClosetime(context,value) {
        context.commit('changeClosetime', value);
    },
    setTel(context,value) {
        context.commit('changeTel', value);
    },
    setMinPrice(context,value) {
        context.commit('changeMinPrice', value);
    },
    setText(context,value) {
        context.commit('changeText', value);
    },
    setStoreId(context,value) {
        context.commit('changeStoreId', value);
    },
    setRadius(context,value) {
        context.commit('changeRadius', value);
    }

}
function doneGetInfo(response, context) {
    context.commit('changeStoreInfo', response.data);
}
function getInfoError(error) {
    let response = error.response;
    if(response.status==400){
        show400ErrorList(error);
        return;
    }
    alert(response.data.message);
}