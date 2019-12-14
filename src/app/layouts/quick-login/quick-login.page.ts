import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController
} from '@ionic/angular';
import {EventService, UserEvent} from '../../core/services/event.service';
import {ValidateUtil} from '../../shared/validate';
import {BaseUI} from '../../core/BaseUI';
import {RestService} from '../../core/services/rest.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-quick-login',
  templateUrl: './quick-login.page.html',
  styleUrls: ['./quick-login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickLoginPage extends BaseUI implements OnInit {

  telphone: string;
  verifyCode: string;
  constructor(public toastController: ToastController,
              public loadingController: LoadingController,
              public http: HttpClient,
              public authService: AuthService,
              public eventService: EventService,
              private navCtrl: NavController) {
    super(loadingController, toastController);
  }

  ngOnInit() {

  }

  getCode() {
    this.http.get('api/v1/phoneCode',
      {params: {phone: this.telphone, vercodeType: 'login'}}).subscribe((res: any) => {
      if (res.success) {
        this.createToast(res.message);
      }
    });
  }

  /**
   * 登录
   */
  async quickLogin() {
    if (!this.validateLoginParam()) {
      return false;
    }
    // TODO: 私密信息不能直接原文传输,需要对密码进行加密
    const params = { username: this.telphone, vcode: this.verifyCode };
    const loading = await this.createLoading();
    this.http.post('api/v1/mobileLogin', params).subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      if (!res.success) { // 失败的情况拦截器已经处理，一般不需要处理
        return;
      }
      const user = Object.assign(res.data.user, {token: res.data.token});
      this.authService.authorization(user);
      this.eventService.broadcast(UserEvent.SIGN_IN, user);
      this.goBack(); // todo: 跳转到首页
    });
    // this.restService.login(params).subscribe(res => {
    //   loading.dismiss();
    //   if (res.isSuccess) {
    //     this.authService.authorization(res.data);
    //     this.eventService.broadcast(UserEvent.SIGN_IN, res.data);
    //     this.navCtrl.back();
    //   } else {
    //     this.createToast(res.message);
    //   }
    // }, error => {
    //   loading.dismiss();
    //   this.createToast('登录失败,请稍后重试');
    // });
  }

  /**
   * 校验登录参数是否合法
   */
  validateLoginParam(): boolean {

    // check username
    const isValidUsername = ValidateUtil.isMobile(this.telphone);
    if (!isValidUsername) {
      this.createToast('请输入有效的手机号码');
      return false;
    }

    // check password
    const isValidPassword = this.verifyCode && this.verifyCode.length === 6;
    if (!isValidPassword) {
      this.createToast('验证码格式不正确');
      return false;
    }
    return true;
  }

  goBack() {
    this.navCtrl.back();
  }

}
