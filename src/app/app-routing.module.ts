import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/components/main/main.component';
import { Paths } from './shared/paths';

const routes: Routes = [
  { path: Paths.Root, pathMatch: 'full', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
