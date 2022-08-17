import actions from '@/action/NavAction'
import mutations from '@/mutaion/NavMutations'

export const NavStore = {
    namespaced: true,
    state: {
        situation: 0,
        loginFlag: sessionStorage.getItem('loginFlag'),
        info:localStorage.getItem('info'),
        showMarketInfo:null,
    },
    getters: {
        getSituation(state) {
            return state.situation;
        },
        getLoginFlag(state) {
            return JSON.parse(state.loginFlag);
        },
        getRole(state) {
            try{
                return JSON.parse(state.info).role;
            }catch{
                return null;
            }
        },
        getShowMarketInfo(state){
            return state.showMarketInfo;
        }
    },
    mutations,
    actions
};
