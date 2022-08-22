import { instance, setInterceptors } from "@/api/request";

function requestGetByCardId(data) {
    setInterceptors(instance);
    return  instance.get('/order/'+data.storeId+'/'+data.cardId);
}

export {
    requestGetByCardId
}