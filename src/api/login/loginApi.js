import { instance } from "../request";

function requestLogin(data) {
    return instance.post('/login',data);
}
export {
    requestLogin,

}