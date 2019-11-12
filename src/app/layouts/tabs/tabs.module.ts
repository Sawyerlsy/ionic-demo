import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginGuardService } from '../../core/services/login-guard.service';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home').then(m => m.HomePageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('../category').then(m => m.CategoryPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart').then(m => m.CartPageModule),
        canActivate: [LoginGuardService]
      },
      {
        path: 'favorite',
        loadChildren: () => import('../favorite').then(m => m.FavoritePageModule),
        canActivate: [LoginGuardService]
      },
      {
        path: 'my',
        loadChildren: () => import('../my').then(m => m.MyPageModule)
      },
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
