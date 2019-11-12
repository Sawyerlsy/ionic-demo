import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  { path: '', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class PageNotFoundModule { }
