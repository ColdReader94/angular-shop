import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IGoodsBaseItem } from "src/app/core/models/goods.model";
import { loadItemsForSale } from "src/app/redux/actions/items-for-sale.actions";
import { loadPopularItems } from "src/app/redux/actions/popular-items.actions";
import { ItemsForSaleSelectors } from "src/app/redux/selectors/items-for-sale.selectors";
import { PopularItemsSelectors } from "src/app/redux/selectors/popular-items.selectors";
import { AppState } from "src/app/redux/state.models";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public itemsForSale$!: Observable<IGoodsBaseItem[]>;
  public itemsPopular$!: Observable<IGoodsBaseItem[]>;

  constructor(private store: Store<AppState>, private selectorsSale: ItemsForSaleSelectors,
    private selectorsPopular: PopularItemsSelectors) {}

  ngOnInit(): void {
    this.itemsForSale$ = this.store.select(this.selectorsSale.selectItemsForSale);
    this.itemsPopular$ = this.store.select(this.selectorsPopular.selectPopularItems);
    this.store.dispatch(loadItemsForSale());
    this.store.dispatch(loadPopularItems());
  }
}
