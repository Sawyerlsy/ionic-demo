import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  /**
   * 商品列表
   */
  @Input() products: Product[];

  /**
   * 
   */
  @Output() loadMore = new EventEmitter();

  @Output() refresh = new EventEmitter();

  /**
   * 是否还有更多的数据,默认为false
   */
  @Input() hasInfiniteData = true;

  /**
   * 商品显示方式,默认为水平方向
   */
  private _displayMode = 'horizontal';
  size = 12;

  constructor() { }

  ngOnInit() { }

  @Input()
  public set displayMode(mode: string) {
    console.log("input displayMode", mode);
    if (mode && mode === 'vertical') {
      this._displayMode = 'vertical';
      this.size = 6;
    } else {
      this._displayMode = 'horizontal';
      this.size = 12;
    }
  }

  public get displayMode(): string {
    return this._displayMode;
  }


  /**
   * 上拉加载更多数据,将event弹射出去,交由父组件处理
   */
  findMoreProduct(event) {
    console.log("sub findMoreProduct...", event);
    this.loadMore.emit(event);
  }

  /**
   * 
   * 下拉刷新
   */
  refreshProduct(event) {
    console.log("下拉刷新...");
    this.refresh.emit(event);
  }

}
