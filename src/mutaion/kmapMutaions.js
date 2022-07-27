export default {
    setMap(state, data) {
        state.map = new window.kakao.maps.Map(data.container, data.options);
    },
    clearSuperAndMarketMarkerArr(state) {
        state.superAndMarketMarkerArr = [];
    },
    clearSearchDataArr(state) {
        state.searchData = [];
    },
    setOwnMarker(state, data) {
        state.ownMarker = data;
    },
    setOwnMarkerFlag(state, data) {
        state.ownMarkerFlag = data;
    }


}