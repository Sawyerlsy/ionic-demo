import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/core';
import { TopMenu } from 'src/app/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  topMenus$: Observable<TopMenu[]>;
  selectedTabLink: string;

  homeTabSliderOption: any;

  constructor(
    private service: RestService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController
  ) {

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
    this.navController.navigateForward(['tabs', 'home', topMenu.link]);
  }


  gotoSearch(): void {
    this.navController.navigateRoot(['search']);
  }

}
