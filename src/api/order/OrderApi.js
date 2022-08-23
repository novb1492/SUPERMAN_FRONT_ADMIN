import { instance, setInterceptors } from "@/api/request";

function requestGetByCardId(data) {
    setInterceptors(instance);
    return  instance.get('/order/'+data.storeId+'/'+data.cardId);
}
function requestRefund(data) {
    setInterceptors(instance);
    return  instance.post('/payment/cancle',data);
}
function requestRefundAll(data) {
    setInterceptors(instance);
    return  instance.post('/payment/cancle/all/'+data);
}
export {
    requestGetByCardId,
    requestRefund,
    requestRefundAll
}