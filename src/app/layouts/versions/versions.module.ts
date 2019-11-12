import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { VersionsPage } from './versions.page';




const routes: Routes = [
  {
    path: '',
    component: VersionsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VersionsPage]
})
export class VersionsPageModule { }
