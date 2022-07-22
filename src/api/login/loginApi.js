import { instance,setInterceptors } from "../request";

function requestLogin(data) {
    setInterceptors(instance);
    return instance.post('/login',data);
}
export {
    requestLogin,

}