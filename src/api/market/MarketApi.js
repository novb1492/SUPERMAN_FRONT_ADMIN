import { instance, setInterceptors } from "@/api/request";

function requestStoreInsert(data) {
    setInterceptors(instance);
    return  instance.post('/admin/store/save', data);
}
function requestStoreListAtSimple(page) {
    setInterceptors(instance);
    return  instance.get('/admin/store/regi/list?page='+page);
}
function requestInviteMember(data) {
    setInterceptors(instance);
    return  instance.post('/admin/employee/save',data);
}
export {
    requestStoreInsert,
    requestStoreListAtSimple,
    requestInviteMember
}
