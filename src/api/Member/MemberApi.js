import { instance, setInterceptors } from "@/api/request";

function requestSearchMember(userId) {
    setInterceptors(instance);
    return  instance.get('/admin/member/info/'+userId);
}
export {
    requestSearchMember
  
}
