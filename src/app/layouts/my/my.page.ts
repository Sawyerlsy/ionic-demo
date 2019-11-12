import { Component, OnInit } from '@angular/core';


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

  constructor() { }

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

}
