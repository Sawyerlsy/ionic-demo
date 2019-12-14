import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController
} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateUtil} from '../../shared/validate';
import {BaseUI} from '../../core/BaseUI';
import {HttpClient} from '@angular/common/http';

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
              private http: HttpClient,
              private router: Router, private formBuilder: FormBuilder, private navCtrl: NavController) {
    super(loadingController, toastController);
    this.form = formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern(ValidateUtil.mobilePattern)])],
      vcode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm: ['', Validators.compose([Validators.required, this.confirmValidator])]
    });
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.form.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      if (this.form && this.form.controls.password.value) {
        return {required: true};
      }
      return {};
    } else if (control.value !== this.form.controls.password.value) {
      return {confirm: true, error: true};
    }
  }

  getCode() {
    this.http.get('api/v1/phoneCode',
      {params: {phone: this.form.controls.phone.value, vercodeType: 'register'}}).subscribe((res: any) => {
      if (res.success) {
        this.createToast(res.message);
        // todo: 跳转到登录界面
      }
    });
  }

  ngOnInit() {
  }

  submit(value) {
    console.log(value);
    this.http.post('api/v1/mobileRegister', this.form.value,
      {params: {vcode: this.form.controls.vcode.value}}).subscribe((res: any) => {
      if (!res.success) {
        return;
      }
      this.createToast(res.message);
    });
    // this.router.navigate(['/category']);
    // this.navCtrl.back();
    // this.navCtrl.navigateBack('/category');
    // this.navCtrl.setTopOutlet
  }


  goBack() {
    this.navCtrl.back();
  }


}
