import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from '../shared/paths';
import { CartComponent } from './components/cart/cart.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { WaitlistComponent } from './components/waitlist/waitlist.component';

const routes: Routes = [
    { path: Paths.Cart, component: CartComponent },
    { path: Paths.Favourite, component: FavouriteComponent },
    { path: Paths.WaitList, component: WaitlistComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule {}
