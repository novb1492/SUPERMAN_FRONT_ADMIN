import { instance, setInterceptors } from "@/api/request";

function requestGetCategorys() {
    setInterceptors(instance);
    return  instance.get('/user/category/list');
}
function requestSave(data) {
    setInterceptors(instance);
    return  instance.post('/manage/product/save',data);
}
export {
    requestGetCategorys,
    requestSave
  
}
