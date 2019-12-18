import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCategory, SearchCondition } from 'src/app/shared';
import { ApiResult } from 'src/app/shared/model/http';
import { PageInfo } from 'src/app/shared/model/page-Info';
import { Shop } from 'src/app/shared/model/shop';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';

/**
 * 商品服务
 * @author Sawyer
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private restService: RestService, private http: HttpClient, private authService: AuthService) { }

  /**
   * 查找商品
   */
  findProducts(condition: SearchCondition): Observable<Product[]> {
    console.log('condition:', condition);
    if (!condition) {
      return of([]);
    }

    // TODO: 完善搜索逻辑
    return this.restService.findProduct(condition).pipe(map(res => res.success ? res.data : []));
  }

  /**
   * 查找推荐商品
   */
  findRecommendProduct(tab?: string): Observable<Product[]> {
    // TODO: 实现推荐商品逻辑
    return this.restService.getProductsByTab(tab);
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

  /**
   * 获取商品列表
   */
  findProduct(page: PageInfo<Product>, condition: SearchCondition): Observable<PageInfo<Product>> {
    // 门店id
    const shopId = null;
    const url = `/api/v1/ums/umsShop/${shopId}/products`;
    // const param = JSON.stringify(page);
    const param = { size: page.size + '', current: page.current + '' };
    return this.http.post<ApiResult<PageInfo<Product>>>(url, condition, {
      params: param
    }).pipe(map(res => {
      console.log('findProduct res:', res);
      console.log('findProduct res.data:', res.data);
      console.log('findProduct res.data.hasNext:', res.data.hasNext);
      let result = res.success ? res.data : new PageInfo<Product>();
      return result ? result : new PageInfo<Product>();
    }));
  }

  /**
   * 获取门店列表
   */
  async findShop(page: PageInfo<Shop>, condition: Shop): Observable<PageInfo<Shop>> {
    // TODO: 完善
    // 获取当前用户的类型
    /* let url = '';
    await this.authService.getSubject().then(user => {
      if (null != user) {
        url = user.isFactory ? '/api/v1/ums/umsUser/userShops' : '/api/v1/ums/umsUser/customerShops';
      }else{}
    }); */
    const type = 'customerShops';
    const url = `/api/v1/ums/umsUser/${type}`;
    // const param = JSON.stringify(page);
    const param = { size: page.size + '', current: page.current + '' };
    return this.http.post<ApiResult<PageInfo<Shop>>>(url, condition, {
      params: param
    }).pipe(map(res => {
      console.log('findShop res:', res);
      console.log('findShop res.data:', res.data);
      // console.log('findShop res.data.hasNext:', res.data.hasNext);
      let result = res.success ? res.data : new PageInfo<Shop>();
      return result ? result : new PageInfo<Shop>();
    }));
  }

}
