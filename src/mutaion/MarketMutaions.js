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
    changeThumbNail(state,value){
        state.thumbnail=value;
    },
    changeName(state,value){
        state.name=value;
    },
    changeOpentime(state,value){
        state.opentime=value;
    }
}