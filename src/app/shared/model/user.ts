/**
 * 用户信息
 */
export interface User {
  id: string;
  token: string;
  username: string;
  mobile: string;
  realName?: string;
  isProxy?: boolean;
  appId?: string;
  sex?: number;
}
