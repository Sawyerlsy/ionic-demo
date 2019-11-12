import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor() { }

  /**
   * send error message to the background
   */
  logError(message: string) {
    // TODO: 当系统出现错误时,调用该方法将信息发送到后台
    console.log('当系统出现错误时,调用该方法将信息发送到后台');
  }
}
