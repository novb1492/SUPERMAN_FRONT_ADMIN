import { instance, setInterceptors } from "@/api/request";

function requestStoreInsert(data) {
    setInterceptors(instance);
    return  instance.post('/auth/store', data);
}
export {
    requestStoreInsert,
}