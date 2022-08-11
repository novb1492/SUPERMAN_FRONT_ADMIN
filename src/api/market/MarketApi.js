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
    return  instance.post('/admin/employee/save',data);
}
function requestStoreList(role,page,keyword,category) {
    setInterceptors(instance);
    return  instance.get('/store/list?page='+page+'&keyword='+keyword+'&category='+category);
}
export {
    requestStoreInsert,
    requestStoreListAtSimple,
    requestInviteMember,
    requestStoreList
}
