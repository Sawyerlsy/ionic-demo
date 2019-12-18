import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { BaseUI } from 'src/app/core/BaseUI';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { RestService } from 'src/app/core/services/rest.service';
import { Ad, Channel, ImageSlider, Product } from 'src/app/shared';
import { PageInfo } from 'src/app/shared/model/page-Info';
import { Shop } from 'src/app/shared/model/shop';


/**
 * 首页明细内容
 */
@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent extends BaseUI implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: RestService,
    public loadingController: LoadingController, public toastController: ToastController,
    private productService: ProductService, private authService: AuthService,
    private navCtrl: NavController) {
    super(loadingController, toastController);
    if (!this.page) {
      this.page = new PageInfo<Product>();
    }
  }

  selectedTabLink$: Observable<string>;

  imageSliders$: Observable<ImageSlider[]>;

  channels$: Observable<Channel[]>;

  ad$: Observable<Ad>;



  sliderOptions: any;

  @ViewChild('banner', { static: true }) baner: IonSlides;


  /**
   * 商品列表
   */
  products$: Observable<Product[]>;

  /**
   * 门店列表
   */
  shops: Shop[];

  page: PageInfo<any>;

  private selectedTabLinkSubscription: Subscription;

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

    // 当选中了门店时,显示推荐商品
    this.selectedTabLink$.pipe(
      distinctUntilChanged(),
      takeWhile(tab => this.hasSelectedShop()),
      switchMap(tab => this.productService.findRecommendProduct(tab))
    );

    // 当没有选中门店时，显示门店信息
    this.selectedTabLink$.pipe(
      distinctUntilChanged(),
      takeWhile(tab => !this.hasSelectedShop()),
      switchMap(tab => {
        return this.productService.findShop(this.page, null);
      })
    ).subscribe(p => {
      this.page.total = p.total;
      this.shops = p.records;
      console.log('remote page:', p);
      console.log('local page:', this.page);
    });

    this.sliderOptions = {
      speed: 400,
      loop: true,
      autoplay: { delay: 2000 },
      effect: 'flip'
    };
  }

  ngOnDestroy(): void {
    if (null != this.selectedTabLinkSubscription) {
      this.selectedTabLinkSubscription.unsubscribe();
    }
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


  /**
   * 是否已选中了门店
   */
  hasSelectedShop(): boolean {
    return null != this.route.snapshot.data.shop;
  }

  /**
   * 上拉加载更多
   */
  findMore(event) {
    console.log('homeDetail 上拉加载更多:', event);

    if (!this.page.hasNext) {
      return;
    }

    // 搜索商店
    this.page.current = this.page.current + 1;
    this.productService.findShop(this.page, null).then(p => {
      console.log(p);
      event.target.complete();
      if (!p.records) {
        return;
      }
      this.shops.concat(p.records);
    });
  }

  /**
   * 下拉刷新
   */
  refresh(event) {
    console.log('homeDetail 下拉刷新:', event);

    if (this.page.total <= 0) {
      return;
    }

    // 重置分页信息
    this.resetPage();

    // 门店列表
    this.productService.findShop(this.page, null).then(p => {
      event.target.complete();
      if (!p.records) {
        this.shops = [];
        return;
      }

      // 如果已经加载了全部商品
      this.shops = p.records;
      this.page.total = p.total;
    });
  }

  /**
   * 重置分页信息
   */
  resetPage() {
    this.page.current = 1;
    this.page.total = 0;
  }

  /**
   * 点击商品
   */
  handleSelectedProduct(product: Product) {
    this.createToast(`选中商品:${product.id}`);
  }

  /**
   * 点击门店
   */
  handleSelectedShop(shop: Shop) {
    this.createToast(`选中门店:${shop.id}`);
    this.authService.keepShop(shop).then(value => {
      this.navCtrl.navigateRoot(['']);
    });
  }


}
