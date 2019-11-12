import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';

/**
 * 登录守卫:判断用户是否登录,如果没有登录则跳转到登录页面
 */
@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(
        private auth: AuthenticationService,
        private navCtrl: NavController
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const hasLogin = this.auth.checkLogin();
        if (!hasLogin) {
            // const modal = await this.auth.showLoginModal();
            this.navCtrl.navigateForward(['/login']);
            return false;
        }
        return hasLogin;
    }

}
