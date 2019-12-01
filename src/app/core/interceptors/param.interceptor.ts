import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 对请求消息进行处理
    const modifiedReq = req.clone({
      setParams: { icode: environment.icode }
    });
    return next.handle(modifiedReq);
  }
}
