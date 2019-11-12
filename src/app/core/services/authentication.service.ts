import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from 'src/app/layouts/login/login.page';
import { STORAGE_USERNAME } from '../../shared/const';

/**
 * 用户鉴权服务
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private storage: Storage, private modalCtrl: ModalController) {
    }

    checkLogin(): boolean {
        let username = null;
        this.storage.get(STORAGE_USERNAME).then(val => {
            username = val;
        });
        return null != username;
    }

    async showLoginModal() {
        const modal = await this.modalCtrl.create({
            component: LoginPage
        });
        return await modal.present();
    }

}
