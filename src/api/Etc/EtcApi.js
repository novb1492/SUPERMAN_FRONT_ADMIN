import { instance, setInterceptors } from "@/api/request";

async function requestUploadImg(data) {
    setInterceptors(instance);
    return await instance.post('/auth/file/upload', data);
}
function requestSns(kind,value) {
    return instance.post('/sns/'+kind+'/'+value);   
}
export {
    requestUploadImg,
    requestSns
}