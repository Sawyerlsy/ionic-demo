/**
 * 用户信息
 */
export interface User {
  id: string;
  token: string;
  username: string;
  phone: string;
  realName: string;
  isProxy: boolean;
  appId: string;
  sex: number;
}
