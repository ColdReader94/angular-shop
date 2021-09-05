import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PopupComponent } from './components/popup/popup.component';



@NgModule({
  declarations: [
    DropdownComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DropdownComponent,
    PopupComponent,
  ],
})
export class SharedModule { }
