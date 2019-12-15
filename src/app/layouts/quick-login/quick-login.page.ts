import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { BaseUI } from '../../core/BaseUI';
import { AuthService } from '../../core/services/auth.service';
import { EventService, UserEvent } from '../../core/services/event.service';
import { ValidateUtil } from '../../shared/validate';

@Component({
  selector: 'app-quick-login',
  templateUrl: './quick-login.page.html',
  styleUrls: ['./quick-login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickLoginPage extends BaseUI implements OnInit {

  mobile: string;
  verifyCode: string;
  constructor(public toastController: ToastController,
              public loadingController: LoadingController,
              public userService: UserService,
              public authService: AuthService,
              public eventService: EventService,
              private navCtrl: NavController) {
    super(loadingController, toastController);
  }

  ngOnInit() {

  }

  /**
   * 获取验证码
   */
  getMessageCode() {
    this.userService.getMessageCode(this.mobile).subscribe(res => {
      if (res.success) {
        this.createToast(res.data);
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

    const loading = await this.createLoading();
    this.userService.signInByMobile(this.mobile, this.verifyCode).subscribe(res => {
      loading.dismiss();
      if (!res.success) {
        this.createToast(res.message);
        return;
      }

      // 将token放入用户信息中
      const user = Object.assign(res.data.user, { token: res.data.token });
      this.authService.authorization(res.data);
      this.eventService.broadcast(UserEvent.SIGN_IN, res.data);
      this.navCtrl.back();
    }, error => {
      // 必须在发生异常后关闭loading,否则loading不会消失
      loading.dismiss();
      this.createToast('登录失败,请稍后重试');
    });
  }

  /**
   * 校验登录参数是否合法
   */
  validateLoginParam(): boolean {

    // check username
    const isValidUsername = ValidateUtil.isMobile(this.mobile);
    if (!isValidUsername) {
      this.createToast('请输入有效的手机号码');
      return false;
    }

    // check verifyCode
    const isValidVerifyCode = this.verifyCode && this.verifyCode.length === 6;
    if (!isValidVerifyCode) {
      this.createToast('验证码格式不正确');
      return false;
    }
    return true;
  }

  goBack() {
    this.navCtrl.back();
  }

}
