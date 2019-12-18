import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCategory, SearchCondition } from 'src/app/shared';
import { ApiResult } from 'src/app/shared/model/http';
import { RestService } from './rest.service';

/**
 * 门店服务
 * @author Sawyer
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private restService: RestService, private http: HttpClient) { }

  /**
   * 查找商品
   */
  findProduct(condition: SearchCondition): Observable<Product[]> {
    console.log("condition:", condition);
    if (!condition) {
      return of([]);
    }

    // TODO: 完善搜索逻辑
    return this.restService.findProduct(condition).pipe(map(res => res.success ? res.data : []));
  }

  /**
   * 
   * 查找推荐商品
   */
  findRecommendProduct(): Observable<Product[]> {
    // TODO: 实现推荐商品逻辑
    const condition = { keyword: 'abc' };
    return this.restService.findProduct(condition).pipe(map(res => res.success ? res.data : []));
  }


  /**
   * 查找商品分类信息
   * @param deepth 深度,从1开始,最大值为10,即1级分类,2级分类...
   */
  findProductCategory(depth: number, parentId?: string): Observable<ApiResult<any>> {
    return null;
  }

  /**
   * 查找商品一级分类信息
   */
  findFirstProductCategory(): Observable<ProductCategory[]> {
    return this.http.get<ApiResult<ProductCategory[]>>('/api/v1/pms/pmsProductCategory/data/select/firstLevel')
      .pipe(map(res => res.success ? res.data : []));
  }

  /**
   * 查找商品最后一级分类信息
   */
  findLastProductCategory(parentCateId?: string): Observable<ProductCategory[]> {
    const url = '/api/v1/pms/pmsProductCategory/data/select/lastLevel';
    const param = { id: parentCateId ? parentCateId : null };
    return this.http.get<ApiResult<ProductCategory[]>>(url, { params: param })
      .pipe(map(res => res.success ? res.data : []));
  }

}