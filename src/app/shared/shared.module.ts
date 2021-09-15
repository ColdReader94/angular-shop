import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from "swiper/angular";
import { NestedSwiperComponent } from './components/nested-swiper/nested-swiper.component';
import { FeedBackStarsDirective } from './directives/feedbacks-view.directive';
import { GallerySwiperComponent } from './components/gallery-swiper/gallery-swiper.component';


@NgModule({
  declarations: [
    DropdownComponent,
    PopupComponent,
    NestedSwiperComponent,
    FeedBackStarsDirective,
    GallerySwiperComponent,
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
    FeedBackStarsDirective,
    GallerySwiperComponent,
  ],
})
export class SharedModule { }
