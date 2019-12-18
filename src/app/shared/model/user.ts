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

  /**
   * 用户选中的门店,可选
   */
  shopId?: string;
}
