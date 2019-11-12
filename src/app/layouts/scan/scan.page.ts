
import { Component, OnInit } from '@angular/core';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.scanQRCode();
  }

  scanQRCode() {
    /* this.qrScanner.prepare()
      .then(async (status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe(async (text: string) => {

            const alert = await this.alertController.create({
              header: '二维码内容',
              message: text,
              buttons: ['OK']
            });
            await alert.present();

            // hide camera preview
            this.qrScanner.hide();
            // stop scanning
            scanSub.unsubscribe();
          });

          this.qrScanner.show();

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          const alert = await this.alertController.create({
            header: '提示',
            message: '请开启相机权限',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          const alert = await this.alertController.create({
            header: '提示',
            message: '扫描失败',
            buttons: ['OK']
          });
          await alert.present();
        }
      })
      .catch(async (e: any) => {
        console.log('Error is', e);
        const alert = await this.alertController.create({
          header: '提示',
          message: e,
          buttons: ['OK']
        });
        await alert.present();
      }); */
  }
}
