export function checkLogin(failUrl, sucUrl, role) {
    if (!JSON.parse(sessionStorage.getItem('loginFlag'))) {
        alert('잘못된 접근입니다');
        location.href = failUrl + '?nextUrl=' + sucUrl;
        return;
    }
    checkRole(role);
}
/**
 * 로그인 혹은 
 * 토큰 재발급시 
 * 다시 토큰 로컬스토리지에 저장 함수
 * @param {response} response 
 */
export function setToken(response) {
    let data = JSON.stringify({
        "authentication": response.headers.authentication,
        "refresh": response.headers.refreshtoken
    });
    localStorage.setItem("authentication", data);
}
/**
 * MyUploadAdapter.js 파일
 *  사용하는 함수 추후에 
 * xhr->axios로 변경 하면 없어져도 됨
 * @param {response} response 
 */
export function setTokenByXhr(response) {
    let data = JSON.stringify({
        "authentication": response.authentication,
        "refresh": response.refreshtoken
    });
    localStorage.setItem("authentication", data);
}
/**
 * 페이지 접근전 
 * 페이지 권한이 있는지 확인한는함수
 * @param {string} role 
 * @returns 
 */
function checkRole(role) {
    let loginRole = getRole();
    console.log(loginRole);
    //admin일경우 
    if (loginRole == 'ADMIN') {
        return;
    } else if (loginRole == 'MANAGE') {//매니저일경우
        checkManage(role);
    } else {//user일경우
        checkUser(role);
    }
}
function go403Page() {
    alert('권한이 없습니다');
    location.href = '/no-permission';
}
function checkManage(role) {
    //여기role 해당 페이지의 role
    if (role == 'ADMIN') {
        go403Page();
    }
}
function checkUser(role) {
    //여기role 해당 페이지의 role
    if (role == 'ADMIN' || role == 'MANAGE') {
        go403Page();
    }
}
export function getRole() {
    try {
        let info = JSON.parse(localStorage.getItem('info'));
        return info.role;
    } catch {
        return null;
    }
}
/**
 * 로그인후 
 * 로컬스토리지에 
 * 기본정보를 저장하는함수
 * @param {response} response 
 */
export function setInfo(response) {
    let responseData = response.data;
    let data = JSON.stringify({
        "id": responseData.id,
        "role": responseData.role
    })
    localStorage.setItem('info', data);
}
/**
 * 예외 발생시
 * 해당 예외가 토큰 재발급 때문인지
 * 확인하는 함수
 * @param {int} state 
 * @param {string} message 
 * @returns 
 */
export function checkNew(state, message) {
    if (state == 403 && message == newTokenMessage()) {
        return true;
    }
    return false;
}
/**
 * 리프레시토큰 유실 혹은 만료시
 * @param {int} state 
 * @param {string} message 
 * @returns 
 */
export function checkexpireLogin(state, message) {
    if (state == 403 && message == '세션이 만료 되었습니다') {
        alert('로그인이 만료 되었습니다')
        return true;
    }
    return false;
}
export function checkParam(val) {
    if (val == undefined || val == null || val == 'undefined' || val == 'null') {
        return true;
    }
    return false;
}
export function checkPage(page) {
    if (checkParam(page) || isNaN(page)) {
        return 1;
    }
    return page;
}
export function changeUrl(url) {
    history.pushState("https://10.150.189.220:3030" + url);
}
export function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        var temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}
/**
 * 새토큰 발급시
 * 서버에서 던저주는 메세지
 * @returns 
 */
export function newTokenMessage() {
    return '새토큰이 발급되었습니다';
}
export function show400ErrorList(error) {
    let errors = error.response.data.errors;
    let data = error.response.data;
    console.log(errors);
    if (errors == null || errors == undefined) {
        alert(data.message);
    } else {
        for (var i in errors) {
            alert(errors[i].defaultMessage);
        }
    }

}
/**
 * 매장 클릭시
 * 그뒤로 네비바에 조회중인 매장 기본정보 표시함수
 * @param {arr} arr 
 * @param {string} storeName 
 * @param {function} changeShowMarketInfo 
 */
export function showStoreInfo(arr,storeName,changeShowMarketInfo) {
    let data=new Object;
    data.addr = arr;
    data.name = storeName;
    changeShowMarketInfo(data);
}
/**
 * 라우터에서 사용하는 기본 쿼리문
 * @returns 
 */
export function storeCommonQueryInRouter(){
    return '^storeid='+getParam('storeid')+'^storeName='+getParam('storeName')+'^addr='+getParam('addr');
}
/**
 * .vue에서 사용하는 기본쿼리문
 * @param {route} route 
 * @returns 
 */
export function storeCommonQuery(route){
    return '&storeid=' + route.query.storeid + '&addr=' + route.query.addr + '&storeName=' + route.query.storeName;
}
export function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}
/**
 * 시간이 지나고 
 * 뒤로/앞으로 가기 버튼 클릭시
 * 생기는 403에러 처리 함수
 */
export function BackButton403Error() {
    location.reload();
}
export function error500(error) {
    let data = error.response.data;
    alert(data.message);
}
/**
 * 에러 처리 하는 함수입니다
 * 물로 페이지별/에러상황별 정책이 다르지만
 * 혼자 만들다 보니 다 생각 하기 힘들어서
 * 한 함수에 몰아 놓고 alert정보만 하고 있습니다
 * @param {error} error 
 */
export function errorHandle(error){
    let response = error.response;
    console
    .log(response);
    if(response.status==400){
        show400ErrorList(error);
        return;
    }else if(response.status==403&&response.data.message==newTokenMessage()){
        BackButton403Error();
        return;
    }else if(response.status==500){
        error500(error);
        return;
    }
    alert(response.data.message);
}