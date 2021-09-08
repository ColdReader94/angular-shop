import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { userDataReducer } from '../redux/reducers/user-data.reducer';
import { LocationComponent } from './components/location/location.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { categoriesReducer } from '../redux/reducers/categories.reducer';

@NgModule({
  declarations: [
    HeaderComponent,
    LocationComponent,
    NavigationComponent,
    LoginPopupComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('userData', userDataReducer),
    StoreModule.forFeature('categories', categoriesReducer),
  ],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule { }
