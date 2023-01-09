declare type Recordable<T = any> = Record<string, T>;

interface UserInfo {
  username: string;
  email: string;
  phone: string;
  avatar: string;
  age?: number;
  address?: string;
}
