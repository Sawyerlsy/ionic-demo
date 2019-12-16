import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { BaseUI } from 'src/app/core/BaseUI';

/**
 * 门店列表
 * @author Sawyer
 */
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage extends BaseUI implements OnInit {

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) {
    super(loadingController, toastController);
  }

  ngOnInit() {
  }

}
