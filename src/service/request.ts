import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookies';

const request = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = { timestamp: +new Date(), ...config.params };
    // TODO: 修改拦截器
    if (!config.params.noAuth) {
      const token = getCookie('token') ?? 'Basic ZmViczoxMjM0NTY=';
      config.headers = { Authorization: token };
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  resp => {
    return Promise.resolve(resp);
  },
  error => {
    return Promise.reject(error);
  },
);

export default request;

export class Apis {}
