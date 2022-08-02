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
    if (role == 'ADMIN') {
        go403Page();
    }
}
function checkUser(role) {
    if (role == 'ADMIN' || role == 'MANAGE') {
        go403Page();
    }
}
export function getRole() {
    let info = JSON.parse(localStorage.getItem('info'));
    return info.role;
}
export function setInfo(response) {
    let responseData=response.data;
    let data=JSON.stringify({
        "id":responseData.id,
        "role":responseData.role
    })
    localStorage.setItem('info',data);
}
