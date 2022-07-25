import axios from 'axios';

export function setInterceptors(instance) {
    instance.interceptors.request.use(
      function(config) {
        let data=JSON.parse(localStorage.getItem('authentication'));
        config.headers.authentication=data.authentication;
        config.headers.refreshToken=data.refresh;
        return config;
      },
      function(error) {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      function(response) {
        console.log(response);
        return response;
      },
      function(error) {
        console.log(error);
        let response=error.response;
        let data=response.data;
        if(response.status==403&&data.message=='새토큰이 발급되었습니다'){
          let header=response.headers;
          let data=JSON.stringify({
            "authentication":header.authentication,
            "refresh":header.refreshtoken
        });
        localStorage.setItem("authentication",data);
        }
        return Promise.reject(error);
      },
    );
  
    return instance;
}
export const instance = axios.create({
    baseURL: 'https://localhost:8080',
    headers: {
      'Content-Type': "application/json",
    }

});