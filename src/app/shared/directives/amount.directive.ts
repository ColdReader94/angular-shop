import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAmount]',
})
export class AmountDirective {
    constructor(private element: ElementRef<HTMLElement>, private render: Renderer2) {}

    @Input() set amount(value: number) {
        if (value === 0) {
            this.element.nativeElement.textContent = `Нет в наличии`;
            this.render.setStyle(
                this.element.nativeElement,
                'background-image',
                'url("assets/images/no-items.png")'
            );
        }
        if (value >= 20) {
            this.element.nativeElement.textContent = `В наличии: ${value}`;
            this.render.setStyle(
                this.element.nativeElement,
                'background-image',
                'url("assets/images/much-items.png")'
            );
            return;
        }
        if (value < 5) {
            this.element.nativeElement.textContent = `В наличии: ${value}`;
            this.render.setStyle(
                this.element.nativeElement,
                'background-image',
                'url("assets/images/low-items.png")'
            );
        } else {
            this.element.nativeElement.textContent = `В наличии: ${value}`;
            this.render.setStyle(
                this.element.nativeElement,
                'background-image',
                'url("assets/images/default-items.png")'
            );
        }
    }
}
