
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

const RATING_STAR_SIZE = 15;
const BASE_FONT_SIZE = 16;

@Directive({
    selector: '[appFeedBackStars]',
})
export class FeedBackStarsDirective {
    constructor(private element: ElementRef<HTMLElement>, private render: Renderer2 ) {
    }

    @Input() set rating(value: number) {
      const ratingWitdh = value * RATING_STAR_SIZE / BASE_FONT_SIZE;

      this.render.setStyle(this.element.nativeElement, 'width', `${ratingWitdh}rem`);
    }
}