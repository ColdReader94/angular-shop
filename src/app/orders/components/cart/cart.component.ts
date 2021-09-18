import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { tryToAddToCart } from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public favoritesItems$!: Observable<IGoodsBaseItem[]>;
  public cart = {
    count: 0,
    date: 0,
  };

  constructor(private store: Store<AppState>,
    private cartItemsSelector: UserDataSelectors, private httpService: HttpRequestsService) { }

  ngOnInit(): void {
     this.favoritesItems$ = this.store.select(this.cartItemsSelector.selectItemsInCart).pipe(
      map((itemsIdArray) => {
        const arr: IGoodsBaseItem[] = [];
        itemsIdArray.map(itemId => this.httpService.getGoods(itemId).subscribe(
          item => arr.push(item))
        );
        return arr;
      })
    );
  }

  public removeFromCart(id: string, event: Event): void {
    (<Element>event.target).closest('.cart-item')?.remove();
    this.store.dispatch(tryToAddToCart({
      itemStatusChange: id,
      isInCart: false,
  }));
  }

}
