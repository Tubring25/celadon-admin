import request from '@/service/request';
// import axios from 'axios';
enum Apis {
  captcha = '/micro-auth/captcha?key=777774396',
  login = 'login',
}

export const getCaptcha = (): Promise<any> => {
  return request.get(Apis.captcha, { responseType: 'blob' });
};

export const login = (data: any): Promise<any> => {
  return request.post(Apis.login, data);
};
