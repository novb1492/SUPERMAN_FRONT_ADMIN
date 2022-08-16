import { instance, setInterceptors } from "@/api/request";

function requestGetCategorys() {
    setInterceptors(instance);
    return  instance.get('/user/category/list');
}
export {
    requestGetCategorys
  
}
