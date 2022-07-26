export function checkLogin(failUrl,sucUrl){
        if(!sessionStorage.getItem('loginFlag')){
            alert('잘못된 접근입니다');
            location.href=failUrl+'?nextUrl='+sucUrl;
        }
    }
export function setToken(response) {
    let data=JSON.stringify({
        "authentication":response.headers.authentication,
        "refresh":response.headers.refreshtoken
    });
    localStorage.setItem("authentication",data);
}
