import { instance } from "../request";

function requestLogin() {
    return instance.post('/login',null);
}
export {
    requestLogin,

}