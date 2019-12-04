import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  /**
   * 选项卡,默认为产品
   */
  tab = 'product';


  constructor() { }

  ngOnInit() {
  }

  /**
   * 显示或隐藏滑动选项
   */
  toggleOption() {
    console.log("toggle option...");
  }
}
