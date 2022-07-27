import actions from '@/action/kakaomapActions'
import mutations from '@/mutaion/kmapMutaions'


export const kmapStore = {
    namespaced: true,
    state: {
        map: null,
        kWidth: 0,
        kHeight: 0,
        superAndMarketMarkerArr: [],
        ps: new window.kakao.maps.services.Places(),
        geocoder: new window.kakao.maps.services.Geocoder(),
        ownMarkerFlag: false,
    },
    getters: {
        getMap(state) {
            return state.map;
        },
        getSuperAndMarketMarkerArr(state) {
            return state.superAndMarketMarkerArr;
        },
        getPs(state) {
            return state.ps;
        },
        getGeocoder(state) {
            return state.geocoder;
        },
        getOwnMarkerFlag(state) {
            return state.ownMarkerFlag;
        }
    },
    mutations,
    actions
};
