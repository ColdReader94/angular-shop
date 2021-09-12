import { Component, Input, ViewEncapsulation } from "@angular/core";
import { IGoodsBaseItem } from "src/app/core/models/goods.model";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-nested-swiper',
  templateUrl: './nested-swiper.component.html',
  styleUrls: ['./nested-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NestedSwiperComponent {
  @Input() slidesData: IGoodsBaseItem[] | null = [];

  public pagination = {
    clickable: true,
  };
}

