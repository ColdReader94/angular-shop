import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DropdownComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    DropdownComponent,
    PopupComponent,
  ],
})
export class SharedModule { }
