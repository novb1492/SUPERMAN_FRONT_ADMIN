import { instance,setInterceptors } from "@/api/request";

async function requestUploadImg(data) {
    setInterceptors(instance);
    return await instance.post('/auth/file/upload',data);
}
export {
    requestUploadImg,
}