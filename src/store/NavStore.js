import actions from '../action/NavAction'
import mutations from '../mutaion/NavMutations'
import Vuex from 'vuex';

export const NavStore = new Vuex.Store({
    state: {
        situation:0
    },
    getters: {
        getMap(state) {
            return state.situation;
        },
    },
    mutations,
    actions
});