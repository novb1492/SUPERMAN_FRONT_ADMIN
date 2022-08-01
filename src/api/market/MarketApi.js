import { instance, setInterceptors } from "@/api/request";

function requestStoreInsert(data) {
    setInterceptors(instance);
    return  instance.post('/admin/store', data);
}
export {
    requestStoreInsert,
}