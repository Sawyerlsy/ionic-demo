import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad, Channel, ImageSlider, Product, TopMenu } from 'src/app/shared';
import { environment } from 'src/environments/environment';

/**
 * 如果采用 `providedIn` ，
 * 这个形式是 Angular v6 之后引入的
 * 这种写法和传统的在 Module 中设置 providers 数组的写法的区别在于
 * 可以让服务在真正被其它组件或服务注入时才编译到最后的 js 中
 * 对于引入第三方类库较多的应用可以有效减小 js 大小
 */
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }

  /**
   * 获取首页轮播图
   */
  getBanners() {
    return this.http.get<ImageSlider[]>(`${environment.baseUrl}/banners`);
  }

  /**
   * 获取首页频道
   */
  getChannels() {
    return this.http.get<Channel[]>(`${environment.baseUrl}/channels`);
  }

  /**
   * 获取首页顶部菜单
   */
  getTabs() {
    return this.http.get<TopMenu[]>(`${environment.baseUrl}/tabs`);
  }

  /**
   * 获取首页广告
   */
  getAdByTab(tab: string) {
    return this.http.get<Ad[]>(`${environment.baseUrl}/ads`, {
      params: { categories_like: tab }
    });
  }

  /**
   * 获取首页商品信息
   */
  getProductsByTab(tab: string) {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`, {
      params: { categories_like: tab }
    });
  }
}
