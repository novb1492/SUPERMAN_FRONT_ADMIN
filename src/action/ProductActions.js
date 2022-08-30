import { requestGetCategorys,requestSave } from "@/api/product/ProductApi";
import { checkNew, show400ErrorList } from "@/assets/js/Jslib";
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
                    errorSave(error);
                });
            } else {
                errorSave(error);
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
function errorGet(error) {
    let response = error.response;
    let data = response.data;
    alert(data.message);
}
function errorSave(error) {
    let response = error.response;
    if(response.status==400){
        show400ErrorList(error);
        return;
    }
    alert(response.data.message);
}