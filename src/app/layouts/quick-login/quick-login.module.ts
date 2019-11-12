import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { QuickLoginPage } from './quick-login.page';



const routes: Routes = [
  {
    path: '',
    component: QuickLoginPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuickLoginPage]
})
export class QuickLoginPageModule { }
