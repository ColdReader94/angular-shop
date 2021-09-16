import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateOrdersModuleGuard } from './orders/guards/activate-orders-module.guard';
import { LoadOrdersModuleGuard } from './orders/guards/load-orders-module.guard';
import { CategoryPageComponent } from './pages/components/category-page/category-page.component';
import { GoodsComponent } from './pages/components/goods/goods.component';
import { MainComponent } from './pages/components/main/main.component';
import { NotFoundComponent } from './pages/components/not-found/not-found.component';
import { SubcategoryComponent } from './pages/components/subcategory/subcategory.component';
import { Paths } from './shared/paths';

const routes: Routes = [
    { path: Paths.Root, pathMatch: 'full', component: MainComponent },
    {
      path: Paths.Orders,
      loadChildren: async() =>
          import('./orders/orders.module').then((module) => module.OrdersModule),
      canLoad: [LoadOrdersModuleGuard],
      canActivate: [ActivateOrdersModuleGuard],
  },
    { path: `${Paths.Category}:id1`, component: CategoryPageComponent },
    { path: `${Paths.Category}:id1/:id2`, component: SubcategoryComponent },
    { path: `${Paths.Goods}:id`, component: GoodsComponent },
  
    { path: Paths.AnyOtherPage, component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
