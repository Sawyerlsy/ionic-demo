import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  /**
   * 是否激活全选按钮,默认为false
   */
  enabledCheckAll = false;

  constructor(public storage: StorageService, public navController: NavController) {

    // this.config = this.common.config;

  }

  ngOnInit() {

  }
}
