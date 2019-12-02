import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPage implements OnInit {

  telphone: string;
  password: string;
  confirmPassword: string;
  verifyCode: string;


  constructor(private router: Router, private navCtrl: NavController) {
  }

  ngOnInit() {
  }

  test() {
    console.log("test...");
    //this.router.navigate(['/category']);
    // this.navCtrl.back();
    // this.navCtrl.navigateBack('/category');
    // this.navCtrl.setTopOutlet
  }


  goBack() {
    this.navCtrl.back();
  }


}
