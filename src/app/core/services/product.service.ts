import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, SearchCondition } from 'src/app/shared';
import { RestService } from './rest.service';

/**
 * 商品服务
 * @author Sawyer
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private restService: RestService) { }

  /**
   * 查找商品
   */
  findProduct(condition: SearchCondition): Observable<Product[]> {
    console.log("condition:", condition);
    if (!condition) {
      return of([]);
    }

    // TODO: 完善搜索逻辑
    return this.restService.findProduct(condition).pipe(map(res => {
      if (res.isSuccess) {
        console.log("issuccess...", res.data);
        return res.data;
      } else {
        return [];
      }
    }));
  }
}
