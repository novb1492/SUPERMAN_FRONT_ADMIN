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
        return response;
      },
      function(error) {
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