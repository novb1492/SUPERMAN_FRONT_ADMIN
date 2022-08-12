import actions from '@/action/MarketAction'
import mutations from '@/mutaion/MarketMutaions'

export const MarketStore = {
    namespaced: true,
    state: {
        storeList: [],
        totalPage:0,
        last:false,
        first:false,
        empty:false,
        nowPage:0,
        storeInfo:null,
        thumbnail: null,
        addr: '',
        detailAddr: '',
        postcode: '',
        marker: null,
        radius: null,
        circle: null,
        result: null,
        companynum: null,
        opentime: null,
        closetime: null,
        tel: null,
        minPrice: null,
        text: null,
        name: null,
        storeId: null
    },
    getters: {
        getStoreList(state) {
            return state.storeList;
        },
        getTotalPage(state) {
            return state.totalPage;
        },
        getLast(state) {
            return state.last;
        },
        getFirst(state) {
            return state.first;
        },
        getEmpty(state) {
            return state.empty;
        },
        getNowPage(state) {
            return state.nowPage;
        },
        getStoreInfo(state){
            return state.storeInfo;
        },
        getAddr(state){
            return state.addr;
        }
    },
    mutations,
    actions
};
