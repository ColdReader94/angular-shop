import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NestedSwiperComponent } from './components/nested-swiper/nested-swiper.component';
import { FeedBackStarsDirective } from './directives/feedbacks-view.directive';
import { GallerySwiperComponent } from './components/gallery-swiper/gallery-swiper.component';
import { ItemComponent } from './components/item/item.component';
import { AmountDirective } from './directives/amount.directive';
import { RouterModule } from '@angular/router';
import { SaleOrPopularDirective } from '../pages/directives/sale-or-popular.directive';

@NgModule({
    declarations: [
        DropdownComponent,
        PopupComponent,
        NestedSwiperComponent,
        FeedBackStarsDirective,
        GallerySwiperComponent,
        ItemComponent,
        AmountDirective,
        SaleOrPopularDirective,
    ],
    imports: [SwiperModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
    exports: [
        FormsModule,
        SwiperModule,
        NestedSwiperComponent,
        DropdownComponent,
        PopupComponent,
        FeedBackStarsDirective,
        GallerySwiperComponent,
        ItemComponent,
        AmountDirective,
        SaleOrPopularDirective,
        ReactiveFormsModule,
    ],
})
export class SharedModule {}
