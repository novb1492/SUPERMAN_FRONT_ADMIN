export default {
    changeSituation(state, data) {
        state.situation = data;
    },
    changeLoginFlag(state, data) {
        sessionStorage.setItem('loginFlag', data);
    },
    changeShowMarketInfo(state,data){
        state.showMarketInfo=data;
    }
}