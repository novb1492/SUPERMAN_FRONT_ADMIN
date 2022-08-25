import { instance, setInterceptors } from "@/api/request";

function requestSave(data) {
    setInterceptors(instance);
    return  instance.post('/deliver/save', data);
}

export {
    requestSave
}