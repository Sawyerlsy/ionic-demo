import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { Product, SearchCondition } from 'src/app/shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {

  /**
   * 用于搜索的条件项
   */
  private searchTrigger$ = new Subject<SearchCondition>();

  /**
   * 商品
   */
  products$: Observable<Product[]>;

  /**
   * 是否显示商品,默认不显示
   */
  showProducts = false;

  /**
   * 关键词
   */
  keyword: string;

  /**
   * 是否还有更多的商品,默认为true
   */
  hasMoreProduct = true;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.searchTrigger$.pipe(
      // wait 300 millisecond
      debounceTime(300),

      // ignore the same data as the previous search
      distinctUntilChanged(),

      //
      switchMap((condition) => this.productService.findProduct(condition))
    );
  }

  /**
   * 
   * 搜索
   */
  search() {
    console.log("search...");
    this.showProducts = true;
    const condition = { keyword: this.keyword };
    this.searchTrigger$.next(condition);
  }

  findMoreProduct(event) {
    console.log("homeDetail 下拉刷新:", event);
    setTimeout(() => {
      // event.target.complete();
      event.target.disabled = true;
      this.hasMoreProduct = false;
    }, 3000);
  }

  refreshProduct(event) {
    console.log("homeDetail 上拉加载更多:", event);
    setTimeout(() => {
      event.target.complete();
      // event.target.disabled = true;
    }, 3000);
  }

}
