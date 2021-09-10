import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from "swiper/angular";


@NgModule({
  declarations: [
    DropdownComponent,
    PopupComponent,
  ],
  imports: [
    SwiperModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    SwiperModule,
    DropdownComponent,
    PopupComponent,
  ],
})
export class SharedModule { }
