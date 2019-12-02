import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPage implements OnInit {

  abc = 'mmmm';

  imgSrc = 'http://t00img.yangkeduo.com/goods/images/2018-08-01/f13e2dff54d604518a1db4facd89d300.png';

  categoryDetailList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  constructor() {
    console.log('CategoryContainerComponent...');
  }

  ngOnInit() {

  }
}
