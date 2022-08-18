import { instance, setInterceptors } from "@/api/request";

async function requestUploadImg(data) {
    setInterceptors(instance);
    return await instance.post('/auth/file/upload', data);
}
function requestListInfo(url) {
    setInterceptors(instance);
    return  instance.get(url);
}
export {
    requestUploadImg,
    requestListInfo
}