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
        thumbnail: null,
        addr: '',
        detailAddr: '',
        postcode: '',
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
        getThumbnail(state){
            return state.thumbnail;
        },
        getAddr(state){
            return state.addr;
        },
        getDetailAddr(state){
            return state.detailAddr;
        },
        getPostcode(state){
            return state.postcode;
        },
        getCompanynum(state){
            return state.companynum;
        },
        getOpentime(state){
            return state.opentime;
        },
        getClosetime(state){
            return state.closetime;
        },
        getTel(state){
            return state.tel;
        },
        getMinPrice(state){
            return state.minPrice;
        },
        getText(state){
            return state.text;
        },
        getName(state){
            return state.name;
        },
        getStoreId(state){
            return state.storeId;
        }        
    },
    mutations,
    actions
};
