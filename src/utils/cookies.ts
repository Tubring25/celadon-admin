import Cookies from 'js-cookie';

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function setCookie(key: string, data: any) {
  return Cookies.set(key, data);
}

export function removeCookie(key: string) {
  return Cookies.remove(key);
}
