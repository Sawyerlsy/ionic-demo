import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { FavoritePage } from './favorite.page';



const routes: Routes = [
  {
    path: '',
    component: FavoritePage
  }
];

/**
 * 收藏页面
 */
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule { 

}
