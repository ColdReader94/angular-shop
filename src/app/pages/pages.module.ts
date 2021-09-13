import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperComponent } from '../shared/components/swiper/swiper.component';
import { StoreModule } from '@ngrx/store';
import { itemsForSaleReducer } from '../redux/reducers/items-for-sale.reducer';
import { popularItemsReducer } from '../redux/reducers/popular-items.reducer';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainComponent,
    SwiperComponent,
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature('itemsForSale', itemsForSaleReducer),
    StoreModule.forFeature('popularItems', popularItemsReducer),
  ],
})
export class PagesModule { }
