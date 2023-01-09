import { AxiosRequestConfig } from 'axios';
interface RequestConfig extends AxiosRequestConfig {
  noAuth: boolean;
}
