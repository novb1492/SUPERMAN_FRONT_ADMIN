import { instance, setInterceptors } from "@/api/request";

function requestSearchMember(userId) {
    setInterceptors(instance);
    return  instance.get('/manage/member/info/'+userId);
}
export {
    requestSearchMember
  
}
