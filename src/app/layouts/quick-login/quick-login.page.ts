import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController
} from '@ionic/angular';
import {UserEvent} from '../../core/services/event.service';
import {ValidateUtil} from '../../shared/validate';
import {BaseUI} from '../../core/BaseUI';

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
              private navCtrl: NavController) {
    super(loadingController, toastController);
  }

  ngOnInit() {

  }

  /**
   * 登录
   */
  async quickLogin() {
    if (!this.validateLoginParam()) {
      return false;
    }

    // TODO: 私密信息不能直接原文传输,需要对密码进行加密
    const params = { username: this.telphone, verifyCode: this.verifyCode };
    const loading = await this.createLoading();
    this.restService.login(params).subscribe(res => {
      loading.dismiss();
      if (res.isSuccess) {
        this.authService.authorization(res.data);
        this.eventService.broadcast(UserEvent.SIGN_IN, res.data);
        this.navCtrl.back();
      } else {
        this.createToast(res.message);
      }
    }, error => {
      loading.dismiss();
      this.createToast('登录失败,请稍后重试');
    });
  }

  /**
   * 校验登录参数是否合法
   */
  validateLoginParam(): boolean {

    // check username
    const isValidUsername = ValidateUtil.isMobile(this.telphone);
    if (!isValidUsername) {
      this.createToast('请输入有效的用户名');
      return false;
    }

    // check password
    const isValidPassword = this.password && this.password.length >= 6 && this.password.length <= 16;
    if (!isValidPassword) {
      this.createToast('密码格式不正确');
      return false;
    }
    return true;
  }

  goBack() {
    this.navCtrl.back();
  }

}
