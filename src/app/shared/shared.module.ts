import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CountDownComponent, HorizontalGridComponent, ProductCardComponent, ScrollableTabComponent, VerticalGridComponent } from './components';
import { AvatarDirective, GoToDirective, GridItemDirective, GridItemImageDirective, GridItemTitleDirective, TagDirective } from './directives';
import { AgoPipe } from './pipes';

@NgModule({
  declarations: [
    ScrollableTabComponent,
    HorizontalGridComponent,
    CountDownComponent,
    VerticalGridComponent,
    ProductCardComponent,
    GridItemDirective,
    GridItemImageDirective,
    GridItemTitleDirective,
    TagDirective,
    AvatarDirective,
    AgoPipe,
    GoToDirective
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [CommonModule, FormsModule, IonicModule,
    ScrollableTabComponent,
    HorizontalGridComponent,
    CountDownComponent,
    VerticalGridComponent,
    ProductCardComponent,
    GridItemDirective,
    GridItemImageDirective,
    GridItemTitleDirective,
    TagDirective,
    AvatarDirective,
    AgoPipe,
    GoToDirective
  ],
})
export class SharedModule { }
