import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { BaseUI } from 'src/app/core/BaseUI';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService, UserEvent } from 'src/app/core/services/event.service';
import { RestService } from 'src/app/core/services/rest.service';
import { ValidateUtil } from 'src/app/shared/validate';
import { slideToRight, slideToTop } from '../../shared/animations/animations';

/**
 * 登录页面
 * @author Sawyer
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideToRight,
    slideToTop
  ]
})
export class LoginPage extends BaseUI implements OnInit {

  @HostBinding('@slideToTop') slideToTop;

  username: string;
  password: string;

  loginForm = { username: null, password: null };

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private eventService: EventService,
    private restService: RestService,
    private authService: AuthService) {
    super(loadingController, toastController);
  }

  ngOnInit() {

  }

  /**
   * 关闭当前页面
   */
  close() {
    this.navCtrl.pop();
  }

  /**
   * 登录
   */
  async login() {
    if (!this.validateLoginParam()) {
      return false;
    }

    // TODO: 私密信息不能直接原文传输,需要对密码进行加密
    const params = { username: this.username, password: this.password };
    const loading = await this.createLoading();
    this.restService.login(params).subscribe(res => {
      loading.dismiss();
      if (res.isSuccess) {
        this.authService.autorization(res.data);
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
    const isValidUsername = this.username && this.username.length >= 2 && this.username.length <= 16
      && !ValidateUtil.containSpecialCharacter(this.username);
    if (!isValidUsername) {
      this.createToast('请输入有效的用户名');
      return false;
    }

    // check password
    const isValidPassword = this.password && this.password.length >= 8 && this.password.length <= 16;
    if (!isValidPassword) {
      this.createToast('密码格式不正确');
      return false;
    }
    return true;
  }
}
