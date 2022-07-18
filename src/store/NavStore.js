import actions from '../action/NavAction'
import mutations from '../mutaion/NavMutations'

export const NavStore ={
    namespaced: true,
    state: {
        situation:0,
        loaginFlag:false,
    },
    getters: {
        getSituation(state) {
            return state.situation;
        },
        getLoginFlag(state) {
            return state.loaginFlag;
        },
    },
    mutations,
    actions
};
