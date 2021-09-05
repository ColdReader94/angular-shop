import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from '../redux/reducers/settings.reducer';
import { LocationComponent } from './components/location/location.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    LocationComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
  ],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule { }
