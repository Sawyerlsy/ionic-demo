import { LoadingController, ToastController } from '@ionic/angular';

/**
 * 由于Loading、Toast使用较为频繁,为了后期维护方便,提取到抽象类中,统一定义
 * @author Sawyer
 */
export abstract class BaseUI {
    constructor(protected loadingController: LoadingController,
        protected toastController: ToastController) {
    }

    async createLoading(msg?: string, loadingId?: string) {
        const loading = await this.loadingController.create({
            message: msg,
            duration: 0,
            showBackdrop: false,
            spinner: 'circles',
            translucent: false,
            // mode: 'ios',
            id: loadingId,
            cssClass: 'custom-loading'
        });
        await loading.present();
    }

    async destroyLoading(loadingId?: string) {
        return await this.loadingController.dismiss(null, null, loadingId);
    }

    async createToast(msg: string, durationMs: number = 2000,
        pos?: 'top' | 'bottom' | 'middle', showCloseBtn?: boolean) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 100000,
            mode: 'md',
            position: pos ? pos : 'middle',
            cssClass: 'custom-toast',
            showCloseButton: showCloseBtn,
            closeButtonText: '关闭'
        });
        toast.present();
    }
}