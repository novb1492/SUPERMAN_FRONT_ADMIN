export default {
    changeStoreList(state, data) {
        console.log(data);
        state.storeList = data.content;
        state.totalPage=data.totalPages;
        state.last=data.last;
        state.first=data.first;
        state.empty=data.empty;
        state.nowPage=data.number+1;
    },
}