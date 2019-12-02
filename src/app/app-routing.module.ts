import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/tabs').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./layouts/login').then(m => m.LoginPageModule)
  },
  {
    path: 'quicklogin',
    loadChildren: () => import('./layouts/quick-login').then(m => m.QuickLoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./layouts/register').then(m => m.RegisterPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./layouts/search').then(m => m.SearchPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./layouts/scan').then(m => m.ScanPageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./layouts/my/personal').then(m => m.PersonalPageModule)
  },
  {
    path: 'versions',
    loadChildren: () => import('./layouts/versions').then(m => m.VersionsPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./layouts/errors/page-not-found').then(m => m.PageNotFoundModule)
  },
];

/**
 * 根路由使用 `RouterModule.forRoot(routes)` 形式。
 * 而功能模块中的路由模块使用 `outerModule.forChild(routes)` 形式。
 * 启用路由的 debug 跟踪模式，需要在根模块中设置 `enableTracing: true`
 * 使用环境变量配置在不同环境下是否激活路由跟踪
 * 在功能模块中定义子路由后，只要导入该模块，等同于在根路由中直接定义
 * 也就是说在 AppModule 中导入 HomeModule 的时候，
 * 由于 HomeModule 中导入了 HomeRouting Module
 * 在 HomeRoutingModule 中定义的路由会合并到根路由表
 * 相当于直接在根模块中定义下面的数组。
 * 需要注意的一个地方是 Angular 路由数组的**顺序**非常重要。
 * 所以此处的 `redirect` 这个条目在根路由中起到了定义各功能模块路由顺序的意义。
 *
 * ```typescript
 * const routes = [{
 *   path: 'home',
 *   component: HomeContainerComponent
 * }]
 * ```
 * @author Sawyer
 */
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }




