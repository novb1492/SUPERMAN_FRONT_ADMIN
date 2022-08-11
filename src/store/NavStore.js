import actions from '@/action/NavAction'
import mutations from '@/mutaion/NavMutations'

export const NavStore = {
    namespaced: true,
    state: {
        situation: 0,
        loginFlag: sessionStorage.getItem('loginFlag'),
        info:localStorage.getItem('info')
    },
    getters: {
        getSituation(state) {
            return state.situation;
        },
        getLoginFlag(state) {
            return JSON.parse(state.loginFlag);
        },
        getRole(state) {
            return JSON.parse(state.info).role;
        }
    },
    mutations,
    actions
};
