import { requestGetCategorys,requestSave } from "@/api/product/ProductApi";
import { checkNew, errorHandle } from "@/assets/js/Jslib";
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
                    errorHandle(error);
                });
            } else {
                errorHandle(error);
            }
        });
    },
    requestProductSave(context,data){
        requestSave(data).then(response=>{
            saveDone(response.data);
        }).catch(error=>{
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                requestSave(data).then(response => {
                    saveDone(response.data);
                }).catch(error => {
                    errorHandle(error);
                });
            } else {
                errorHandle(error);
            }
        })
    }
}
function saveDone(data) {
    alert(data.message);
    location.reload();
}
function getDone(context,data) {
    context.commit('setCategorys', data);
}