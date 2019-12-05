import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

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

  /**
   * 选项卡默认关闭
   */
  isOpened = false;

  /**
   * 收藏的商品
   */
  favoriteProducts = [1, 2, 3];

  /**
   * 收藏的店铺
   */
  favoriteShops = [1, 2, 3];

  @ViewChildren(IonItemSliding) ionItemSlidings: QueryList<IonItemSliding>;

  constructor(private elr: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  /**
   * 显示或隐藏滑动选项
   */
  toggleOption(index) {
    const currentSliding = this.ionItemSlidings.find((ele, idx) => idx === index);
    if (currentSliding) {
      currentSliding.open('end');
    }
  }

  /**
   * 移除
   */
  remove() {
    console.log('remove...');
  }
}
