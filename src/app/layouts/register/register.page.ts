import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { BaseUI } from '../../core/BaseUI';
import { ValidateUtil } from '../../shared/validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPage extends BaseUI implements OnInit {

  form: FormGroup;

  constructor(public toastController: ToastController,
    public loadingController: LoadingController,
    private userService: UserService,
    private formBuilder: FormBuilder, private navCtrl: NavController) {
    super(loadingController, toastController);
    this.form = formBuilder.group({
      mobile: ['', Validators.compose([Validators.required, Validators.pattern(ValidateUtil.mobilePattern)])],
      vcode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])],
      loginPwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm: ['', Validators.compose([Validators.required, this.confirmValidator])]
    });
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.form.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      if (this.form && this.form.controls.loginPwd.value) {
        return { required: true };
      }
      return {};
    } else if (control.value !== this.form.controls.loginPwd.value) {
      return { confirm: true, error: true };
    }
  }

  ngOnInit() {
  }

  /**
   * 获取验证码
   */
  getMessageCode() {
    this.userService.getMessageCode(this.form.controls.phone.value).subscribe(res => {
      if (res.success) {
        this.createToast(res.data);
      }
    });
  }

  /**
   * 注册
   */
  async submit(value) {
    console.log('form value:', value);
    const loading = await this.createLoading();
    const params = this.form.value;
    this.userService.signUp(params, this.form.controls.vcode.value).subscribe(res => {
      loading.dismiss();
      this.createToast(res.message);

      // 注册成功后跳转到登录页面
      if (res.success) {
        this.navCtrl.navigateRoot(['login']);
      }

    }, error => {
      // 必须在发生异常后关闭loading,否则loading不会消失
      loading.dismiss();
      this.createToast('登录失败,请稍后重试');
    });
  }

}
