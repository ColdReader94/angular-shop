import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from "swiper/angular";
import { NestedSwiperComponent } from './components/nested-swiper/nested-swiper.component';


@NgModule({
  declarations: [
    DropdownComponent,
    PopupComponent,
    NestedSwiperComponent,
  ],
  imports: [
    SwiperModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    SwiperModule,
    NestedSwiperComponent,
    DropdownComponent,
    PopupComponent,
  ],
})
export class SharedModule { }
