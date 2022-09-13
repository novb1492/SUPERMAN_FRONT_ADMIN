import { instance, setInterceptors } from "@/api/request";

function requestGetByPeriod(data) {
    setInterceptors(instance);
    return  instance.get(`/payment/chart/${data.year}/${data.month}/${data.storeId}`);
}
export {
    requestGetByPeriod
}
