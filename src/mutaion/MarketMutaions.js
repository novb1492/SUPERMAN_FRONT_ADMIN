export default {
    changeStoreList(state, data) {
        state.storeList = data.content;
        state.totalPage = data.totalPages;
        state.last = data.last;
        state.first = data.first;
        state.empty = data.empty;
        state.nowPage = data.number + 1;
    },
    changeStoreInfo(state, data) {
        state.storeInfo = data;
    },
    changeAddr(state, addr) {
        state.addr = addr;
    },
    changeThumbNail(state, value) {
        state.thumbnail = value;
    },
    changeName(state, value) {
        state.name = value;
    },
    changeOpentime(state, value) {
        state.opentime = value;
    },
    changeThumbnail(state,value) {
        state.thumbnail=value;
    },
    changeDetailAddr(state,value) {
        state.detailAddr=value;
    },
    changePostcode(state,value) {
        state.postcode=value;
    },
    changeCompanynum(state,value) {
        state.companynum=value;
    },
    changeClosetime(state,value) {
        state.closetime=value;
    },
    changeTel(state,value) {
        state.tel=value;
    },
    changeMinPrice(state,value) {
        state.minPrice=value;
    },
    changeText(state,value) {
        state.text=value;
    },
    changeStoreId(state,value) {
        state.storeId=value;
    },
    changeRadius(state,value) {
        state.radius=value;
    }
}