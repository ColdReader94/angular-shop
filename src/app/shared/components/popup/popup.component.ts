import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
    host: {
        '(document:click)': 'onClick($event)',
    },
})
export class PopupComponent {
    @Output() closePopup = new EventEmitter();
    
    constructor(private ref: ElementRef) {}

    public onClick(event: Event): void {
      if (!(<Element>this.ref.nativeElement).contains(<Element>event.target) && 
      !(<Element>event.target).closest('button')) {
        this.closePopup.emit();
      }
  }

}
