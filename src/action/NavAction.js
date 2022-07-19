export default {
    changeSituation(context,data) {
        context.commit('changeSituation',data);
    },
    changeLoginFlag(context,data) {
        console.log(data);
        context.commit('changeLoginFlag',data);
    }
}