import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './ordrers-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { WaitlistComponent } from './components/waitlist/waitlist.component';



@NgModule({
  declarations: [
    CartComponent,
    FavouriteComponent,
    WaitlistComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
  ],
})
export class OrdersModule {}
