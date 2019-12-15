import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { BaseUI } from 'src/app/core/BaseUI';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService, UserEvent } from 'src/app/core/services/event.service';
import { UserService } from 'src/app/core/services/user.service';
import { ValidateUtil } from 'src/app/shared/validate';
// import { slideToRight, slideToTop } from '../../shared/animations/animations';

/**
 * 登录页面
 * @author Sawyer
 */


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  /* animations: [
   slideToRight,
   slideToTop
 ] */
})
export class LoginPage extends BaseUI implements OnInit {

  // @HostBinding('@slideToTop') slideToTop;

  username: string;
  password: string;

  loginForm = { username: null, password: null };

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private eventService: EventService,
    private userService: UserService,
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

    const loading = await this.createLoading();
    this.userService.signInByUsername(this.username, this.password).subscribe(res => {
      loading.dismiss();
      if (!res.success) {
        this.createToast(res.message);
        return;
      }

      // 将token放入用户信息中
      const user = Object.assign(res.data.user, { token: res.data.token });
      const appUser = this.userService.transfomRemoteUser(user);
      this.authService.authorization(appUser);
      this.eventService.broadcast(UserEvent.SIGN_IN, appUser);

      // TODO: 登录成功后应该返回原来的地址
      this.navCtrl.navigateRoot(['']);
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
    const isValidUsername = this.username && this.username.length >= 2 && this.username.length <= 16
      && !ValidateUtil.containSpecialCharacter(this.username);
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
}
