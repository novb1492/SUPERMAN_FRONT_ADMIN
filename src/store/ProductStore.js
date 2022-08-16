import actions from '@/action/ProductActions'
import mutations from '@/mutaion/ProductMutaions'

export const ProductStore = {
    namespaced: true,
    state: {
        name: null,
        origin:null,
        introduce:null,
        price:null,
        prodcutImgPath:null,
        category:null,
        storeId:null,
        events:[],
        categorys:null,
    },
    getters: {
        getName(state) {
            return state.name;
        },
        getOrigin(state) {
            return state.origin;
        },
        getIntroduce(state) {
            return state.introduce;
        },
        getPrice(state) {
            return state.price;
        },
        getProductImgPath(state) {
            return state.prodcutImgPath;
        },
        getCategory(state) {
            return state.category;
        },
        getStoreId(state) {
            return state.storeId;
        },
        getEvents(state) {
            return state.events;
        },
        getCategorys(state) {
            return state.categorys;
        },
    },
    actions,
    mutations,
};
