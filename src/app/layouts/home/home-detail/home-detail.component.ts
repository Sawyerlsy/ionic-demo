import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { BaseUI } from 'src/app/core/BaseUI';
import { RestService } from 'src/app/core/services/rest.service';
import { Ad, Channel, ImageSlider, Product } from 'src/app/shared';


@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent extends BaseUI implements OnInit {
  constructor(private route: ActivatedRoute, private service: RestService,
    public loadingController: LoadingController, public toastController: ToastController) {
    super(loadingController, toastController);
  }

  selectedTabLink$: Observable<string>;

  imageSliders$: Observable<ImageSlider[]>;

  channels$: Observable<Channel[]>;

  ad$: Observable<Ad>;

  products$: Observable<Product[]>;

  sliderOptions: any;

  @ViewChild('banner', { static: true }) baner: IonSlides;

  /**
   * 是否还有更多商品,默认为true
   */
  hasMoreProduct = true;

  ngOnInit() {
    /* const loading = await this.createLoading();
    setTimeout(() => {
      loading.dismiss();
    }, 2000); */

    this.selectedTabLink$ = this.route.paramMap.pipe(
      filter(params => params.has('tabLink')),
      map(params => params.get('tabLink'))
    );

    // load imageSlider and channel
    this.imageSliders$ = this.service.getBanners();
    this.channels$ = this.service.getChannels();

    // load ad
    this.ad$ = this.selectedTabLink$.pipe(
      switchMap(tab => this.service.getAdByTab(tab)),
      filter(ads => ads.length > 0),
      map(ads => ads[0])
    );

    // load product
    this.products$ = this.selectedTabLink$.pipe(
      switchMap(tab => this.service.getProductsByTab(tab))
    );

    this.sliderOptions = {
      speed: 400,
      loop: true,
      autoplay: { delay: 2000 },
      effect: 'flip'
    };
  }

  ionViewDidEnter() {
    // console.log('ionViewDidEnter...');
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter...');
    // this.slides.startAutoplay();
  }

  ionViewWillLeave() {
    // console.log('ionViewWillLeave...');
    // this.slides.stopAutoplay();
  }

  /**
   * fix the slider does not automatically slide after the touch
   */
  ionSlideTouchEnd(e) {
    this.baner.startAutoplay();
  }

  findMoreProduct(event) {
    console.log("homeDetail 下拉刷新:", event);
    setTimeout(() => {
      // event.target.complete();
      event.target.disabled = true;
      this.hasMoreProduct = false;
    }, 3000);
  }

  refreshProduct(event) {
    console.log("homeDetail 上拉加载更多:", event);
    setTimeout(() => {
      // event.target.complete();
      event.target.disabled = true;
    }, 3000);
  }
}
