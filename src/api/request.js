import { setToken } from '@/assets/js/Jslib';
import axios from 'axios';

export function setInterceptors(instance) {
    instance.interceptors.request.use(
      (config)=> {
        let data=JSON.parse(localStorage.getItem('authentication'));
        if(data!=null){
          config.headers.authentication=data.authentication;
          config.headers.refreshToken=data.refresh;
        }
        return config;
      },
      (error)=> {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      (response)=> {
        return response;
      },
      (error)=> {
        console.log(error);
        setToken(error.response);
        let response=error.response;
        let data=response.data;
        if(response.status==403&&data.message=='새토큰이 발급되었습니다'){
          setToken(response);
        }
        return Promise.reject(error);
      },
    );
  
    return instance;
}
export const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': "application/json",
    }

});