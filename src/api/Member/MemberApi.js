import { instance, setInterceptors } from "@/api/request";

function requestSearchMember(userId) {
    setInterceptors(instance);
    return  instance.get(`/manage/member/info/${userId}`);
}
function requestLogOut() {
    setInterceptors(instance);
    return  instance.post('/log-out',null);
}
export {
    requestSearchMember,
    requestLogOut
  
}
