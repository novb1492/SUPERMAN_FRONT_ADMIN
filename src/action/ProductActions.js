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
    }
}
function getDone(context,data) {
    context.commit('setCategorys', data.categorys);
}
function errorGet(error) {
    let response = error.response;
    let data = response.data;
    alert(data.message);
}