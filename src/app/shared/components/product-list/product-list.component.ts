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
   * 是否显示提示信息
   */
  @Input() showTips = false;

  @Input() tips = '已经全部加载完毕';


  @Output() selected = new EventEmitter();

  /**
   * 商品显示方式,默认为水平方向
   */
  private _displayMode = 'horizontal';
  size = 12;

  constructor() { }

  ngOnInit() { }

  @Input()
  public set displayMode(mode: string) {
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

  selectedItem(product: Product) {
    this.selected.emit(product);
  }

}
