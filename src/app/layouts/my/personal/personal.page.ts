import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService, UserEvent } from 'src/app/core/services/event.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService,
    private navController: NavController,
    private eventService: EventService,
    private alertController: AlertController) {

  }

  ngOnInit() {
    // 页面初始化完毕后,尝试加载用户信息
    this.authService.getSubject().then(val => this.currentUser = val);

    // 监听用户登录事件
    this.eventService.subscribe(UserEvent.SIGN_IN, (res) => {
      this.currentUser = res;
    });

    // 监听用户注册事件
    this.eventService.subscribe(UserEvent.SIGN_UP, (res) => {
      console.log('sign up...');
    });
  }

  /**
   * 点击退出
   */
  async signOut() {
    await this.authService.revoke();
    this.eventService.broadcast(UserEvent.SIGN_OUT, null);
    this.currentUser = null;
    this.navController.navigateRoot('/');
  }

  async confirmSignOut() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '确定退出登录?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          cssClass: '',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });

    await alert.present();
  }

}
