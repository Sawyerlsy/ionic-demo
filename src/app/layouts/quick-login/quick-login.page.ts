import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quick-login',
  templateUrl: './quick-login.page.html',
  styleUrls: ['./quick-login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickLoginPage implements OnInit {

  telphone: string;

  constructor(private navCtrl: NavController) {
    console.log("QuickLoginPage...");
  }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back();
  }

}
