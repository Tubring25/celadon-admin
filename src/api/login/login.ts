import request from '@/service/request';
export enum Apis {
  captcha = '/micro-auth/captcha',
  login = '/micro-auth/oauth/token',
}
export const getCaptcha = (): Promise<any> => {
  return request.get(Apis.captcha, {
    params: { key: 123, noAuth: true },
    responseType: 'blob',
  });
};

export const login = (data: any): Promise<any> => {
  return request.post(Apis.login, null, {
    params: { key: 123, ...data },
  });
};
