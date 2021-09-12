import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';



@NgModule({
  declarations: [
    LoginPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    LoginPopupComponent,
  ],
})
export class AuthModule { }
