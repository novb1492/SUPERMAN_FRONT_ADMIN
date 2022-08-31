export function checkLogin(failUrl, sucUrl, role) {
    if (!JSON.parse(sessionStorage.getItem('loginFlag'))) {
        alert('잘못된 접근입니다');
        location.href = failUrl + '?nextUrl=' + sucUrl;
        return;
    }
    checkRole(role);
}
export function setToken(response) {
    let data = JSON.stringify({
        "authentication": response.headers.authentication,
        "refresh": response.headers.refreshtoken
    });
    localStorage.setItem("authentication", data);
}
export function setTokenByXhr(response) {
    let data = JSON.stringify({
        "authentication": response.authentication,
        "refresh": response.refreshtoken
    });
    localStorage.setItem("authentication", data);
}
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
export function setInfo(response) {
    let responseData = response.data;
    let data = JSON.stringify({
        "id": responseData.id,
        "role": responseData.role
    })
    localStorage.setItem('info', data);
}
export function checkNew(state, message) {
    if (state == 403 && message == newTokenMessage()) {
        return true;
    }
    return false;
}
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
export function failGetStoreList(error) {
    let response = error.response;
    alert(response.data.message);
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
export function showStoreInfo(arr,storeName,changeShowMarketInfo) {
    let data=new Object;
    data.addr = arr;
    data.name = storeName;
    changeShowMarketInfo(data);
}
export function storeCommonQueryInRouter(){
    return '^storeid='+getParam('storeid')+'^storeName='+getParam('storeName')+'^addr='+getParam('addr');
}
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
export function BackButton403Error() {
    location.reload();
}