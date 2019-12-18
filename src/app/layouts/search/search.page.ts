import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { BaseUI } from 'src/app/core/BaseUI';
import { ProductService } from 'src/app/core/services/product.service';
import { Product, SearchCondition } from 'src/app/shared';
import { PageInfo } from 'src/app/shared/model/page-Info';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage extends BaseUI implements OnInit, OnDestroy {

  /**
   * 用于搜索的条件项
   */
  private searchTrigger$ = new Subject<SearchCondition>();

  /**
   * 商品
   */
  products: Product[];

  /**
   * 是否显示商品,默认不显示
   */
  showProducts = false;

  /**
   * 关键词
   */
  keyword: string;

  page: PageInfo<Product>;

  private condition: SearchCondition;


  private productSubscription: Subscription;


  constructor(private productService: ProductService,
    public toastController: ToastController,
    public loadingController: LoadingController) {
    super(loadingController, toastController);
  }

  ngOnInit(): void {
    /* this.searchTrigger$.pipe(
      // wait 300 millisecond
      debounceTime(300),

      // ignore the same data as the previous search
      distinctUntilChanged(),

      //
      switchMap((condition) => this.productService.findProduct(this.page, condition)),

    ).subscribe(res => {
    }); */
  }

  ngOnDestroy(): void {
    // 取消订阅
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  /**
   *
   * 搜索
   */
  search() {
    // 显示商品
    this.showProducts = true;

    // 构建分页信息
    this.page = new PageInfo<Product>();

    // 构建搜索条件
    this.condition = { keyword: this.keyword };

    // 搜索
    this.productService.findProduct(this.page, this.condition).then(p => {
      this.page.total = p.total;
      this.products = p.records;
      console.log('remote page:', p);
      console.log('local page:', this.page);
    });
  }

  /**
   * 上拉加载更多
   */
  findMoreProduct(event) {
    console.log('homeDetail 上拉加载更多:', event);

    if (!this.page.hasNext) {
      return;
    }

    // 搜索商品
    this.page.current = this.page.current + 1;
    this.productService.findProduct(this.page, this.condition).then(p => {
      console.log(p);
      event.target.complete();
      if (!p.records) {
        return;
      }
      this.products.concat(p.records);
    });
  }

  /**
   * 下拉刷新
   */
  refreshProduct(event) {
    console.log('homeDetail 下拉刷新:', event);

    if (this.page.total <= 0) {
      return;
    }

    // 重置分页信息
    this.resetPage();

    // 搜索商品
    this.productService.findProduct(this.page, this.condition).then(p => {
      event.target.complete();
      if (!p.records) {
        this.products = [];
        return;
      }

      // 如果已经加载了全部商品
      this.products = p.records;
      this.page.total = p.total;
    });
  }

  /**
   * 重置分页信息
   */
  resetPage() {
    this.page.current = 1;
    this.page.total = 0;
  }

}
