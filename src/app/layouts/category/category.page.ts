import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BaseUI } from 'src/app/core/BaseUI';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCategory } from 'src/app/shared';

/**
 * 分类展示界面
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPage extends BaseUI implements OnInit {

  /**
   * 左侧商品分类列表
   */
  leftCategoryList$: Observable<ProductCategory[]>;

  /**
   * 右侧商品分类列表
   */
  rightCategoryList$: Observable<ProductCategory[]>;

  selectedCategory$ = new Subject<string>();

  abc = 'mmmm';

  imgSrc = 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png';

  loading = null;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private productService: ProductService) {
    super(loadingController, toastController);
  }

  ngOnInit() {
    this.leftCategoryList$ = this.productService.findFirstProductCategory().pipe(
      tap(cates => {
        if (cates && cates.length > 0) {
          this.selectedCategory(cates[0].id);
        }
      })
    );

    this.rightCategoryList$ = this.selectedCategory$.pipe(
      distinctUntilChanged(),
      tap(async cates => this.loading = await this.createLoading()),
      switchMap(cateId => this.productService.findLastProductCategory(cateId)),
      tap(cates => this.loading.dismiss()));
  }

  /**
   * 点击左侧分类
   */
  async selectedCategory(cateId: string): Promise<void> {
    this.selectedCategory$.next(cateId);
  }
}
