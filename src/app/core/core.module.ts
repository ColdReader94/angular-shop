import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { userDataReducer } from '../redux/reducers/user-data.reducer';
import { LocationComponent } from './components/location/location.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { categoriesReducer } from '../redux/reducers/categories.reducer';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        LocationComponent,
        NavigationComponent,
        CategoriesComponent,
        FooterComponent,
        CatalogComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthModule,
        RouterModule,
        StoreModule.forFeature('userData', userDataReducer),
        StoreModule.forFeature('categories', categoriesReducer),
    ],
    exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
