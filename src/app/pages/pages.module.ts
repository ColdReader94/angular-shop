import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperComponent } from '../shared/components/swiper/swiper.component';

@NgModule({
  declarations: [
    MainComponent,
    SwiperComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class PagesModule { }
