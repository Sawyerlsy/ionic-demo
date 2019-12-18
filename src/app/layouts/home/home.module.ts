import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopResolve } from 'src/app/core/support/shop-resolve';
import { SharedModule } from 'src/app/shared';
import { HomeDetailComponent } from './home-detail';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // resolve:null,
    children: [
      {
        /**
         * 路由节点可以没有 component
         * 一般用于重定向到一个默认子路由
         */
        path: '',
        redirectTo: 'hot',
        pathMatch: 'full'
      },
      {
        /**
         * 路径参数，看起来是 URL 的一部分
         */
        path: ':tabLink',
        component: HomeDetailComponent,
        resolve: {
          shop: ShopResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, HomeDetailComponent]
})
export class HomePageModule { }
