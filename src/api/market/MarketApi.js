import { instance, setInterceptors } from "@/api/request";

function requestStoreInsert(data) {
    setInterceptors(instance);
    return  instance.post('/admin/store/save', data);
}
function requestInviteMember(data) {
    setInterceptors(instance);
    return  instance.post('/manage/employee/save',data);
}
function requestStoreInfo(id) {
    setInterceptors(instance);
    return  instance.get('/store/'+id);
}
function requestCompanyNumInsert(data) {
    setInterceptors(instance);
    return  instance.post('/admin/company/save',data);
}
function requestGetCompanyNumAll(){
    setInterceptors(instance);
    return  instance.get('/admin/company/list/all');
}
export {
    requestStoreInsert,
    requestInviteMember,
    requestStoreInfo,
    requestCompanyNumInsert,
    requestGetCompanyNumAll
}
