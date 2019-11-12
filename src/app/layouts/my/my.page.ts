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

  myList: SelfInfo[];

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.myList = [
      {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '我的订单',
        link: 'order'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '浏览历史',
        link: 'browsing_history'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '我的收藏',
        link: 'favorite'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '基本信息',
        link: 'info'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '帮助中心',
        link: 'help'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '关于我们',
        link: 'about'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '联系客服',
        link: 'customservice'
      }, {
        img: 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png',
        name: '关于APP',
        link: 'versions'
      }];
  }


  async doPress() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '长按事件测试',
      buttons: ['确定'],
      backdropDismiss: false
    });
    await alert.present();
  }

}
