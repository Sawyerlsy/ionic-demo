import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';

/**
 * 登录守卫:判断用户是否登录,如果没有登录则跳转到登录页面
 */
@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private navCtrl: NavController
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const currentUser = await this.auth.getSubject();
        const isSignIn = null != currentUser;
        console.log("isSignIn:", isSignIn);
        if (!isSignIn) {
            // const modal = await this.auth.showLoginModal();
            this.navCtrl.navigateForward(['/login']);
            return false;
        }
        return isSignIn;
    }

}
