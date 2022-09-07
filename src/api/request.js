import { checkexpireLogin} from '@/assets/js/Jslib';
import axios from 'axios';

export  function setInterceptors(instance)  {
  instance.interceptors.request.use(
    (config) => {
      let data = JSON.parse(localStorage.getItem('authentication'));
      if (data != null) {
        config.headers.authentication = data.authentication;
        config.headers.refreshToken = data.refresh;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  // Add a response interceptor
   instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      let response = error.response;
      let data = response.data;
      if(checkexpireLogin(response.status,data.message)){
        location.href='/login?nextUrl='+location.href;
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
export const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': "application/json",
  }

});