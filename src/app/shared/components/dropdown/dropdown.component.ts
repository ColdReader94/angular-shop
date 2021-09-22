import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    host: {
        '(document:click)': 'onClick($event)',
    },
})
export class DropdownComponent {
    @Input() buttonText: string | null = '';
    public dropDown = false;

    constructor(private ref: ElementRef) {}

    public dropDownToggle(event: Event): void {
        if ((<Element>this.ref.nativeElement).contains(<Element>event.target)) {
            this.dropDown = !this.dropDown;
        }
    }

    public onClick(event: Event): void {
        if (!(<Element>this.ref.nativeElement).contains(<Element>event.target))
            this.dropDown = false;
    }
}
