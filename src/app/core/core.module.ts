import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from '../redux/reducers/settings.reducer';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('settings', settingsReducer),
  ],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule { }
