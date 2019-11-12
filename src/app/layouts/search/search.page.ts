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

  private searchTerms = new Subject<string>();

  product$: Observable<Product[]>;

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

  search(term: string) {
    this.searchTerms.next(term);
  }

}
