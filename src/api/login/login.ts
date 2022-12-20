import { defHttp } from '@/service';

enum Apis {
  login = '/login',
}

export const login = () => {
  return defHttp.get({ url: Apis.login });
};
