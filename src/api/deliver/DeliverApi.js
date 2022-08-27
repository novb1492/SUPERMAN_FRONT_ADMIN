import { instance, setInterceptors } from "@/api/request";

function requestSave(data) {
    setInterceptors(instance);
    return  instance.post('/deliver/save', data);
}
function requestGetDetail(data) {
    setInterceptors(instance);
    return  instance.get('/deliver/'+data.storeId+'/'+data.deliverId);
}
function requestChangeState(data){
    setInterceptors(instance);
    return  instance.put('/deliver/start', data);
}
export {
    requestSave,
    requestGetDetail,
    requestChangeState
}