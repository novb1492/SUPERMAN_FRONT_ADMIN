import { instance, setInterceptors } from "@/api/request";

function requestStoreInsert(data) {
    setInterceptors(instance);
    return  instance.post('/admin/store/save', data);
}
function requestStoreListAtSimple(page) {
    setInterceptors(instance);
    return  instance.get('/manage/store/regi/list?page='+page);
}
function requestInviteMember(data) {
    setInterceptors(instance);
    return  instance.post('/manage/employee/save',data);
}
function requestStoreList(role,page,keyword,category) {
    setInterceptors(instance);
    return  instance.get('/store/list?page='+page+'&keyword='+keyword+'&category='+category);
}
function requestStoreInfo(id) {
    setInterceptors(instance);
    return  instance.get('/store/'+id);
}
function requestCompanyNumInsert(data) {
    setInterceptors(instance);
    return  instance.post('/admin/company/save',data);
}
export {
    requestStoreInsert,
    requestStoreListAtSimple,
    requestInviteMember,
    requestStoreList,
    requestStoreInfo,
    requestCompanyNumInsert
}
