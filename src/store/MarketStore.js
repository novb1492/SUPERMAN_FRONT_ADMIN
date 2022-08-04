import actions from '@/action/MarketAction'
import mutations from '@/mutaion/MarketMutaions'

export const MarketStore = {
    namespaced: true,
    state: {
        storeList: [],
        totalPage:0,
        last:false,
        first:false,
        empty:false
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
        }
    },
    mutations,
    actions
};
