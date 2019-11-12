import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
/**
 * 加载框
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
    constructor(private loadingController: LoadingController) { }

    async create(msg: string, loadingId?: string) {
        const loading = await this.loadingController.create({
            message: msg,
            duration: 0,
            showBackdrop: false,
            spinner: 'circles',
            translucent: false,
            mode: 'ios',
            id: loadingId
        });
        await loading.present();
    }

    async destroy(loadingId?: string) {
        return await this.loadingController.dismiss(null, null, loadingId);
    }
}