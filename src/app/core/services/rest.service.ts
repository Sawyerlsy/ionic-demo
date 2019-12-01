import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ad, Channel, ImageSlider, Product, TopMenu } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';

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
  constructor(private http: HttpClient, private logService: LogService) { }

  /**
   * 获取首页轮播图
   */
  getBanners() {
    return this.restGet<ImageSlider[]>('getBanners', '/banners');
  }

  /**
   * 获取首页频道
   */
  getChannels() {
    return this.restGet<Channel[]>('getChannels', '/channels');
  }

  /**
   * 获取首页顶部菜单
   */
  getTabs() {
    return this.restGet<TopMenu[]>('getTabs', '/tabs');
  }

  /**
   * 获取首页广告
   */
  getAdByTab(tab: string) {
    return this.restGet<Ad[]>('getAdByTab', '/ads', {
      params: { categories_like: tab }
    });
  }

  /**
   * 获取首页商品信息
   */
  getProductsByTab(tab: string) {
    return this.restGet<Product[]>('getProductsByTab', '/products', {
      params: { categories_like: tab }
    });
  }


  /**
   *  get 请求
   */
  private restGet<T>(operation: string, url: string, options?: HttpOption): Observable<T> {
    return this.http.get<T>(environment.baseUrl + url, options)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }



  /**
   *  post 请求
   */
  private restPost<T>(operation: string, url: string, options?: HttpOption): Observable<T> {
    return this.http.post<T>(environment.baseUrl + url, options)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }


  /**
   * 将错误信息发送到服务器端
   */
  private handleError<T>(error: HttpErrorResponse): Observable<any> {
    // TODO:将错误信息发送到服务器端
    console.error(error);
    this.logService.logError(`failed: ${error.message}`);
    return of(error);
  }
}

export interface HttpOption {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
