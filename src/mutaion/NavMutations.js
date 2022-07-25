export default {
    changeSituation(state,data){
        state.situation=data;
    },
    changeLoginFlag(state,data){
        localStorage.setItem('loginFlag',data);
    },
}