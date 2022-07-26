import actions from '@/action/basicActions'
import mutations from '@/mutaion/basicMutaions'

export const basicStore ={
    namespaced: true,
    state: {
        tt:null,
    },
    getters: {
        getTt(state){
            return state.tt;
        }
    },
    actions,
    mutations,
};
