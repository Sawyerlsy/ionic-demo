import {Injectable, Injector, Inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../../shared/model/user";
import {LoadingController} from "@ionic/angular";
import {DefaultInterceptor} from "../interceptors";

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private authService: AuthService,
    private loadingController: LoadingController
  ) {
  }

  private viaHttp(resolve: any, reject: any) {
    this.authService.getSubject().then((user: User) => {
      if (user) {
        AuthService.token = user.token;
      }
      resolve(null);
    });


  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
    });
  }
}
