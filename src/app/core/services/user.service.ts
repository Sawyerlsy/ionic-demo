import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/model/http';
import { User } from 'src/app/shared/model/user';

/**
 * 用户服务
 * @author Sawyer
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * 使用手机号码登录
   *  @param mobile 手机号
   * @param verifyCode 验证码
   */
  signInByMobile(mobile: string, verifyCode: string): Observable<ApiResult<any>> {
    return this.http.post<ApiResult<any>>('api/v1/mobileLogin', { username: mobile, vcode: verifyCode });
  }

  /**
   * 通过用户名密码登录
   */
  signInByUsername(username: string, password: string): Observable<ApiResult<any>> {
    // TODO: 私密信息不能直接原文传输,需要对密码进行加密
    return this.http.post<ApiResult<any>>('api/v1/mobileLogin', { username, password });
  }

  /**
   * 注册
   */
  signUp(params: any, verifyCode: string): Observable<ApiResult<any>> {
    return this.http.post<ApiResult<any>>('api/v1/mobileRegister', params, { params: { vcode: verifyCode } });
  }

  /**
   * 获取手机验证码
   */
  getMessageCode(mobile: string) {
    return this.http.get<ApiResult<any>>('api/v1/messageCode', { params: { phone: mobile } });
  }

  /**
   * 将后台user对象转为app端友好的User
   * @param user
   */
  transfomRemoteUser(remoteUser: any): User {
    let appUser: User = { username: '', mobile: '' };
    appUser.username = remoteUser.username;
    appUser.mobile = remoteUser.phone;
    appUser.token = remoteUser.token;
    appUser.userStatus = remoteUser.ustatus;

    // 厂商信息
    appUser.isCustomer = remoteUser.isCustomer;
    appUser.isFactory = remoteUser.isFactory;
    appUser.isProxy = remoteUser.isProxy;

    // 头像、姓名
    const deepUser = remoteUser['sysrUserAlone'];
    appUser.realName = deepUser ? deepUser.realName : '';
    appUser.avatar = deepUser ? deepUser.avatar : '';
    return appUser;
  }

}
