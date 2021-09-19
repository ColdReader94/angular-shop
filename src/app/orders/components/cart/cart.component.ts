import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { IOrder, IOrderItem } from 'src/app/core/models/order.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { oderHasBeenMade, orderMakeFailed, tryToAddToCart } from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';
import { Paths } from 'src/app/shared/paths';
import { OrderHandlingService } from '../../services/order-handling.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public formHasErrors = false;
  public showPopup = false;
  public favoritesItems$!: Observable<IGoodsBaseItem[]>;
  public cart: IOrder = {
    items: [],
    details: {
        totalPrice: 0,
        name: '',
        address: '',
        phone: '',
        timeToDeliver: '',
        dateToDeliver: '',
        comment: '',
    },
  };
  public orderForm: FormGroup = new FormGroup({
    "name": new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
]),
    "address": new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
]),
    "phone": new FormControl("+", [
      Validators.required,
      Validators.pattern("[\+][0-9]+"),
]),
    "timeToDeliver": new FormControl("",
      Validators.required
),
    "dateToDeliver": new FormControl("",
      Validators.required),
    "comment": new FormControl("", Validators.maxLength(250)),
});

  constructor(private store: Store<AppState>,
    private cartItemsSelector: UserDataSelectors, private httpService: HttpRequestsService, private orderService: OrderHandlingService, private router: Router) { }

  ngOnInit(): void {
     this.favoritesItems$ = this.store.select(this.cartItemsSelector.selectItemsInCart).pipe(
      map((itemsIdArray) => {
        const arr: IGoodsBaseItem[] = [];
        const cartItems: IOrderItem[] = [];
        itemsIdArray.map(itemId => this.httpService.getGoods(itemId).subscribe(
          item => {
            cartItems.push({ id: item.id, price: item.price, amount: 1 });
            arr.push(item);
          }

            )
        );
        this.cart.items = cartItems;
        return arr;
      })
    );
  }

  public removeFromCart(id: string, event: Event, index: number): void {
    (<Element>event.target).closest('.cart-item')?.remove();
    this.store.dispatch(tryToAddToCart({
      itemStatusChange: id,
      isInCart: false,
  }));
    this.cart.items[index].price = 0;
    this.cart.items[index].amount = 0;
  }

  public totalPriceCount(): number {
    return this.cart.details.totalPrice = this.cart.items.reduce((sum, current) => sum + current.price * current.amount, 0);
  }

  public checkAmount(itemAmount: number, availiable: number, index: number): void {
    this.cart.items[index].amount = itemAmount > availiable ? availiable : itemAmount;
  }

  public confirmOrder(): void {
    if (this.orderForm.valid) {
      this.cart.details = { ...this.cart.details, ...this.orderForm.value as IOrder };
      this.orderService.makeOrder(this.cart)
      .subscribe((value) => {
        if (value === 'OK') {
          this.showPopup = true;
          this.store.dispatch(oderHasBeenMade());
        } else {
          this.store.dispatch(orderMakeFailed({ errorMessage: 'Заказ не был обработан' }));
        }
      });
    } else {
      this.formHasErrors = true;
    }
  }

  public orderComplete(): void {
    this.router.navigate([Paths.Root]);
    this.showPopup = false;
  }
}
