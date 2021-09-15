import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { IGoodsBaseItem } from "src/app/core/models/goods.model";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-nested-swiper',
  templateUrl: './nested-swiper.component.html',
  styleUrls: ['./nested-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NestedSwiperComponent {
  @Input() slidesData: IGoodsBaseItem[] | null = [];

  constructor(private router: Router) {}

  public navigate(id: string): void {
    this.router.navigate(['', 'goods', 'item', id]);
  }
}

