import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService, UserEvent } from 'src/app/core/services/event.service';
import { User } from 'src/app/shared/model/user';


export interface SelfInfo {
  img: string;
  name: string;
  link: string;
}

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {

  currentUser: User;

  constructor(public alertController: AlertController, private authService: AuthService,
    private eventService: EventService) { }

  async doPress() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '长按事件测试',
      buttons: ['确定'],
      backdropDismiss: false
    });
    await alert.present();
  }


  ngOnInit() {
    // 页面初始化完毕后,尝试加载用户信息
    this.authService.getSubject().then(val => this.currentUser = val);

    // 监听用户登录事件
    this.eventService.subscribe(UserEvent.SIGN_IN, (res) => {
      this.currentUser = res;
    });

    // 监听用户退出事件
    this.eventService.subscribe(UserEvent.SIGN_OUT, (res) => {
      this.currentUser = res;
    });

    // 监听用户注册事件
    this.eventService.subscribe(UserEvent.SIGN_UP, (res) => {
      console.log('sign up...');
    });

  }

}
