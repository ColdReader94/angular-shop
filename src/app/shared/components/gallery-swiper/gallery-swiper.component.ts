import { Component, Input, ViewEncapsulation } from "@angular/core";
import SwiperCore, { Navigation, Swiper, Thumbs } from "swiper";

SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-gallery-swiper',
  templateUrl: './gallery-swiper.component.html',
  styleUrls: ['./gallery-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GallerySwiperComponent{
  @Input() images: string[] = [];

  public thumbsSwiper: Swiper | null | undefined;
}
