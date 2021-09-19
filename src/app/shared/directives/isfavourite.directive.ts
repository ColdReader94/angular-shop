import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';

@Directive({
    selector: '[appIsfavourite]',
})
export class IsfavouriteDirective {
    constructor(private element: ElementRef<HTMLElement>, private render: Renderer2) {}

    @Input() set item(value: IGoodsBaseItem) {
        if (value.isFavorite) {
            this.render.addClass(
                this.element.nativeElement,
                'add-to-favourite-btn__active'
            );
        }
    }
}
