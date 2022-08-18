export default {
    requestLogin(state, data) {
        console.log(state);
        console.log(data);
    },
    changePaginList(state, data) {
        console.log(data);
        state.infoList = data.content;
        state.totalPage = data.totalPages;
        state.last = data.last;
        state.first = data.first;
        state.empty = data.empty;
        state.nowPage = data.number + 1;
    },
}