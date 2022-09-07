import actions from '@/action/basicActions'
import mutations from '@/mutaion/basicMutaions'

export const basicStore = {
    namespaced: true,
    state: {
        doneFlag: false,
        infoList: [],
        totalPage: 0,
        last: false,
        first: false,
        empty: false,
        nowPage: 0
    },
    getters: {
        getInfoList(state) {
            return state.infoList;
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
        getDoneFlag(state){
            return state.doneFlag;
        }
    },
    actions,
    mutations,
};
