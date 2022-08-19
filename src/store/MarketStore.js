import actions from '@/action/MarketAction'
import mutations from '@/mutaion/MarketMutaions'

export const MarketStore = {
    namespaced: true,
    state: {
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
        storeId: null,
        radius: null,
        randDone:false,
        companynums:[]
    },
    getters: {
        getCompanynums(state) {
            return state.companynums;
        },
        getRandDone(state) {
            return state.randDone;
        },
        getStoreList(state) {
            return state.storeList;
        },
        getThumbnail(state) {
            return state.thumbnail;
        },
        getAddr(state) {
            return state.addr;
        },
        getDetailAddr(state) {
            return state.detailAddr;
        },
        getPostcode(state) {
            return state.postcode;
        },
        getCompanynum(state) {
            return state.companynum;
        },
        getOpentime(state) {
            return state.opentime;
        },
        getClosetime(state) {
            return state.closetime;
        },
        getTel(state) {
            return state.tel;
        },
        getMinPrice(state) {
            return state.minPrice;
        },
        getText(state) {
            return state.text;
        },
        getName(state) {
            return state.name;
        },
        getStoreId(state) {
            return state.storeId;
        },
        getRadius(state) {
            return state.radius;
        }
    },
    mutations,
    actions
};
