import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './pages/components/category-page/category-page.component';
import { MainComponent } from './pages/components/main/main.component';
import { NotFoundComponent } from './pages/components/not-found/not-found.component';
import { SubcategoryComponent } from './pages/components/subcategory/subcategory.component';
import { Paths } from './shared/paths';

const routes: Routes = [
  { path: Paths.Root, pathMatch: 'full', component: MainComponent },
  { path: `${Paths.Category}:id1`, component: CategoryPageComponent },
  { path: `${Paths.Category}:id1/:id2`, component: SubcategoryComponent },
  { path: Paths.AnyOtherPage, component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
