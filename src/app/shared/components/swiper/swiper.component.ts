import { Component, Input, ViewEncapsulation } from "@angular/core";
import { IGoodsBaseItem } from "src/app/core/models/goods.model";
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperComponent {
  @Input() slidesData: IGoodsBaseItem[] = [];

}
