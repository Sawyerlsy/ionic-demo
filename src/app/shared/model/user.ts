/**
 * 用户信息
 */
export interface User {
  id?: string;
  token?: string;
  username: string;
  mobile: string;
  realName?: string;
  appId?: string;
  sex?: number;
  avatar?: string;
  isProxy?: boolean;
  isFactory?: boolean;
  isCustomer?: boolean;
  userStatus?: number;
}
