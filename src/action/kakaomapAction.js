export default {
    init(context,data) {
        context.commit('setMap',data);
    },
    clearSuperAndMarketMarkerArr(context,payload){
        var superAndMarketMarkerArr=payload.arr;
        var indexArr=payload.not;
        for(var ii in superAndMarketMarkerArr){
            if(indexArr.indexOf(ii*1)==-1){
                superAndMarketMarkerArr[ii].setMap(null);
            }
        }
        context.commit('clearSuperAndMarketMarkerArr');
    },
    clearSearchDataArr(context){
        context.commit('clearSearchDataArr');
    },
    setOwnMarker(context,payload){
        context.commit('setOwnMarkerFlag',payload.flag);
    }
}