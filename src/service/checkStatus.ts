import type { ErrorMessageMode } from '#/axios';
import { notification, Modal } from 'antd';

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
  response?: any,
): void {
  let errMsg: string = '';
  switch (status) {
    case 400:
      errMsg = '400 Error';
      break;
    case 401:
      errMsg = '登录失效';
      break;
    case 403:
      errMsg = '403 Error';
      break;
    case 404:
      errMsg = '404 Not Found';
      break;
    case 500:
      errMsg = '500 Error';
      break;
    case 501:
      errMsg = '501 Error';
      break;
    case 502:
      errMsg = '502 Error';
      break;
    default:
      errMsg = '发生未知错误';
  }
  if (msg) {
    errMsg = msg;
    if (errorMessageMode == 'message') {
      const [api] = notification.useNotification();
      api.warning({
        message: status,
        description: errMsg,
        placement: 'topRight',
      });
    } else {
      Modal.warning({
        title: status,
        content: errMsg,
      });
    }
  }
}
