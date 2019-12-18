import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Shop } from 'src/app/shared/model/shop';
import { User } from 'src/app/shared/model/user';

/**
 * 用户鉴权和授权服务
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static STORAGE_USER_KEY = 'currentUser';
  public static STORAGE_SHOP_KEY = 'currentShop';
  public static token = '';

  constructor(private storageService: StorageService) {
  }

  /**
   * 授权指定用户
   */
  authorization(user: User): boolean {
    // 存储当前用户对象
    if (user && user.username) {
      this.storageService.set(AuthService.STORAGE_USER_KEY, user);
      return true;
    }
    return false;
  }

  /**
   * 收回权限
   */
  revoke() {
    return this.storageService.remove(AuthService.STORAGE_USER_KEY);
  }

  /**
   * 获取当前登录用户
   */
  getSubject(): Promise<User> {
    return this.storageService.get(AuthService.STORAGE_USER_KEY);
  }


  /**
   * 获取当前门店信息
   */
  getCurrentShop(): Promise<Shop> {
    return this.storageService.get(AuthService.STORAGE_SHOP_KEY);
  }

  /**
   * 保存当前门店信息
   * @param 门店
   */
  keepShop(shop: Shop) {
    this.storageService.set(AuthService.STORAGE_SHOP_KEY, shop);
  }

}
