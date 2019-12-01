import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


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

  userinfo: any = {};

  constructor(public alertController: AlertController) { }

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

    //监听注册 登录成功的事件
    this.userinfo = [];
  }


  //在页面tab切换  以及第一次加载的时候会触发    但是login返回的时候没法触发
  ionViewWillEnter() {

    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter');
  }


  //解决问题：注册、登录成功返回以后立即显示用户信息  

}
