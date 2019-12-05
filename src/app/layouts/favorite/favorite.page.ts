import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared';

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
  favoriteProducts = [];

  /**
   * 收藏的店铺
   */
  favoriteShops = [1, 2, 3];

  /**
   * 推荐商品
   */
  recommendProducts$: Observable<Product[]>;

  @ViewChildren(IonItemSliding) ionItemSlidings: QueryList<IonItemSliding>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.recommendProducts$ = this.productService.findRecommendProduct();
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
