import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services';
import { Product } from 'src/app/shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  /**
   * 用于搜索的条件项
   */
  private searchTerms = new Subject<string>();

  /**
   * 商品
   */
  product$: Observable<Product[]>;

  /**
   * 是否显示商品,默认不显示
   */
  showProducts = false;

  /**
   * 关键词
   */
  keywords: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.product$ = this.searchTerms.pipe(
      // wait 300 millisecond
      debounceTime(300),

      // ignore the same data as the previous search
      distinctUntilChanged(),

      // 
      switchMap((iterm: string) => this.productService.findProducts(iterm))
    );
  }

  /**
   * 
   * 搜索
   */
  search() {
    console.log("search...");
    this.searchTerms.next(this.keywords);
    this.showProducts = true;
  }

}
