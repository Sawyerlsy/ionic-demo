import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {environment} from 'src/environments/environment';
import {AuthService} from '../services/auth.service';
import {mergeMap, catchError} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {LoadingController, ToastController} from '@ionic/angular';
import {User} from 'src/app/shared/model/user';
import {Storage} from '@ionic/storage';
import {StorageService} from '../services/storage.service';

/**
 * 通知
 */
@Injectable({
  providedIn: 'root'
})
export class DefaultInterceptor implements HttpInterceptor {
  constructor(public toastController: ToastController, private storage: Storage,
              private storageService: StorageService, private loadingController: LoadingController) {
   /* this.storage.get(AuthService.STORAGE_USER_KEY).then((user: User) => {
      if (user) {
        this.token = user.token;
      }
    });*/
  }
  public static loading: any;
  // token = '';
  public static loaderToShow = false;

  /*get auth(): AuthService {
    return this.injector.get(AuthService);
  }*/
/*
  get toastController(): ToastController {
    return this.injector.get(ToastController);
  }

  get loadingController(): LoadingController {
    return this.injector.get(LoadingController);
  }*/

  async createToast(msg: string, durationMs: number = 2000,
                    pos?: 'top' | 'bottom' | 'middle', showCloseBtn?: boolean) {
    const toast = await this.toastController.create({
      message: msg,
      duration: durationMs,
      mode: 'md',
      position: pos ? pos : 'middle',
      cssClass: 'custom-toast',
      showCloseButton: showCloseBtn,
      closeButtonText: '关闭'
    });
    toast.present();
  }

  async createLoading(msg?: string) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 0,
      showBackdrop: false,
      spinner: 'circles',
      translucent: false,
      // mode: 'ios',
      cssClass: 'custom-loading'
    });
    await loading.present();
    return loading;
  }

  showLoader() {
    if (DefaultInterceptor.loaderToShow) {
      return;
    }
    DefaultInterceptor.loading.present().then(() => {
      DefaultInterceptor.loaderToShow = true;
    });
  }


  /*showLoader() {
    /!*if (this.loaderToShow) {
      return;
    }*!/
    this.createLoading().then(loading => {
      this.loaderToShow = loading;
    });
    // if (this.loaderToShow) {
    //   return;
    // }
    // this.loaderToShow = true;
    // this.loadingController.create({
    //   message: '加载中',
    //   // duration: 0,
    //   // showBackdrop: false,
    //   // spinner: 'circles',
    //   // translucent: false,
    //   // mode: 'ios',
    //   // cssClass: 'custom-loading'
    // }).then((res) => {
    //   res.present();
    //
    //   res.onDidDismiss().then((dis) => {
    //     console.log('Loading dismissed!');
    //     this.loaderToShow = false;
    //   });
    // });
    this.hideLoader();
  }*/

  hideLoader() {
    if (DefaultInterceptor.loaderToShow) {
      DefaultInterceptor.loading.dismiss();
      // this.loaderToShow = false;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // this.showLoader();

    let url = req.url;
    const needHandler = !url.startsWith('http');
    let headers = req.headers;
    if (needHandler) {
      url = `${environment.serverBaseUrl}${url}`;
      headers = req.headers.set('token', AuthService.token);
    }
    const newReq = req.clone({url,  headers});
    // 对响应消息进行处理
    // return next.handle(newReq);
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          if (needHandler) {
            // this.hideLoader();
            return this.handleData(event, url);
          }
        }
        // this.hideLoader();
        // 若一切都正常，则后续操作
        return of(event);
      }),
      // catchError((err: HttpErrorResponse) => this.handleData(err, url)),
      catchError((err: HttpErrorResponse) => {
        // this.hideLoader();
        return this.handleData(err, url);
      }));
  }

  private handleData(ev: HttpResponseBase, url: string): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    // this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, message: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        if (ev instanceof HttpResponse) {
          const body: any = ev.body;
          if (!body.success) {
            // this.msg.error(body.message);
            if (body.code === 401) {
              this.storageService.clear();
            }
            this.createToast(body.message);
            // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
            // this.http.get('/').subscribe() 并不会触发
            return throwError({});
          } else {
            // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
            // return of(new HttpResponse(Object.assign(ev, { body: body.response })));
            // 或者依然保持完整的格式
            return of(ev);
          }
        }
        break;
      case 401: // 未登录状态码
        // 请求错误 401: https://preview.pro.ant.design/api/401 用户没有权限（令牌、用户名、密码错误）。
        //  清空token
        this.storageService.clear();
        /*(this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        if (url.indexOf('/api/v1/login') == -1) {
          this.goTo('/passport/login');
          break;
        }*/
        if (ev instanceof HttpErrorResponse) {
          return throwError(ev.error);
        }
        return throwError(ev);
      /*case 403:
      case 404:
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      case 501:
        if (ev instanceof HttpErrorResponse) {
          this.notice.create("error", '业务异常', ev.error.message, { nzDuration: 0 });
          return;
        }
        return throwError(ev);*/
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }
}
