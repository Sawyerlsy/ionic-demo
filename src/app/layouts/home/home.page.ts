import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BaseUI } from 'src/app/core/BaseUI';
import { RestService } from 'src/app/core/services/rest.service';
import { TopMenu } from 'src/app/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseUI implements OnInit {

  topMenus$: Observable<TopMenu[]>;
  selectedTabLink: string;

  homeTabSliderOption: any;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private service: RestService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController
  ) {
    super(loadingController, toastController);
  }

  ngOnInit(): void {
    this.topMenus$ = this.service.getTabs();
    this.selectedTabLink = this.activatedRoute.snapshot.children[0].params.tabLink;
    // 设置顶部tab的滑动选项
    this.homeTabSliderOption = {
      width: 52,
      height: 30,
      spaceBetween: 0
    };
  }

  handleTabSelected(topMenu: TopMenu) {
    this.navController.navigateForward(['tabs', 'home', topMenu.link], { animated: false });
  }


  gotoSearch(): void {
    this.navController.navigateRoot(['search']);
  }

}
