import { instance } from "@/api/request";

function requestLogin(data) {
    return instance.post('/login',data);
}
export {
    requestLogin,

}