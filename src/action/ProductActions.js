import { requestGetCategorys } from "@/api/product/ProductApi";
import { checkNew } from "@/assets/js/Jslib";
export default {
    requestGetCategorys(context) {
        requestGetCategorys().then(response => {
            getDone(context,response.data);
        }).catch(error => {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestGetCategorys().then(response => {
                    getDone(context,response.data);
                }).catch(error => {
                    errorGet(error);
                });
            } else {
                errorGet(error);
            }
        });
    },
    setProductImgPath(context,value){
        context.commit('setProductImgPath', value);
    },
    setEventFlag(context,value){
        context.commit('setEventFlag', value);
    },
    setEventCount(context,value){
        context.commit('setEventCount', value);
    },
    setEvents(context,value){
        context.commit('setEvents', value);
    },
    setEventCancleCount(context,value){
        context.commit('setEventCancleCount', value);
    }
}
function getDone(context,data) {
    context.commit('setCategorys', data);
}
function errorGet(error) {
    let response = error.response;
    let data = response.data;
    alert(data.message);
}