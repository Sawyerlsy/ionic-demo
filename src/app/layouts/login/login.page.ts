import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/core/services/event.service';
import { slideToRight, slideToTop } from '../../shared/animations/animations';


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
export class LoginPage implements OnInit {

  @HostBinding('@slideToTop') slideToTop;

  username: string;
  password: string;

  constructor(
    private modalContrller: ModalController,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private eventService: EventService) {

  }

  ngOnInit() {

  }

  /**
   * 关闭当前页面
   */
  close() {
    /* this.modalContrller.dismiss({
      dismissed: true
    }); */

    this.navCtrl.pop();
  }

  /**
   * 登录
   */
  login() {
    this.eventService.broadcast('test', 'This is a message from LoginPage!');
    this.navCtrl.back();
    /* var loading = super.showLoading(this.loadingCtrl, "登录中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(
        f => {
          if (f["Status"] == "OK") {
            //处理登录成功的页面跳转
            //你也可以存储接口返回的 token
            this.storage.set('UserId', f["UserId"]);
            loading.dismiss();
            this.dismiss();
          }
          else {
            loading.dismiss();
            super.showToast(this.toastCtrl, f["StatusContent"]);
          }
        },
        error => this.errorMessage = <any>error); */
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
      mode: 'md',
      position: 'top'
    });
    toast.present();
  }

}
