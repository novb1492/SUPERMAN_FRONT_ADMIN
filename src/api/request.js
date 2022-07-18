import axios from 'axios';

export function setInterceptors(instance) {
    instance.interceptors.request.use(
      function(config) {
        config.headers.Authrozation = 'aaaaaa';
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
    baseURL: 'http://localhost:8080',

});