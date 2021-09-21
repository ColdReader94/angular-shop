import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { ICart, IOrder, IOrderItem } from 'src/app/core/models/order.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import {
    orderConfirmed,
    orderMakeFailed,
    tryToAddToCart,
} from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';
import { OrderHandlingService } from '../../services/order-handling.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public formHasErrors = false;
    public showPopup = false;
    public itemsInCart$!: Observable<IGoodsBaseItem[]>;
    public cart: ICart = {
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
    public totalPriceShow$: Observable<number>;
    public orderForm: FormGroup = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
        ]),
        address: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
        ]),
        phone: new FormControl('+', [
            Validators.required,
            Validators.pattern('[+][0-9]+'),
        ]),
        timeToDeliver: new FormControl('', Validators.required),
        dateToDeliver: new FormControl('', Validators.required),
        comment: new FormControl('', Validators.maxLength(250)),
    });
    private totalPrice$ = new BehaviorSubject(0);

    constructor(
        private store: Store<AppState>,
        private cartItemsSelector: UserDataSelectors,
        private httpService: HttpRequestsService,
        private orderService: OrderHandlingService
    ) {
        this.totalPriceShow$ = this.totalPrice$.asObservable();
    }

    ngOnInit(): void {
        this.itemsInCart$ = this.store
            .select(this.cartItemsSelector.selectItemsInCart)
            .pipe(
                map((itemsIdArray) => {
                    const arr: IGoodsBaseItem[] = [];
                    const cartItems: IOrderItem[] = [];
                    itemsIdArray.map((itemId) =>
                        this.httpService.getGoods(itemId).subscribe((item) => {
                            cartItems.push({
                                id: item.id,
                                price: item.price,
                                amount: 1,
                                name: item.name,
                                imageUrls: item.imageUrls,
                            });
                            arr.push(item);
                        })
                    );
                    this.cart.items = cartItems;
                    return arr;
                })
            );
    }

    public removeFromCart(id: string): void {
        this.store.dispatch(
            tryToAddToCart({
                itemStatusChange: id,
                isInCart: false,
            })
        );
    }

    public totalPriceCount(): number {
        return (this.cart.details.totalPrice = this.cart.items.reduce(
            (sum, current) => sum + current.price * current.amount,
            0
        ));
    }

    public checkAmount(itemAmount: number, availiable: number, index: number): void {
        this.cart.items[index].amount = itemAmount > availiable ? availiable : itemAmount;
    }

    public confirmOrder(): void {
        if (this.orderForm.valid) {
            this.cart.details = {
                ...this.cart.details,
                ...(this.orderForm.value as IOrder),
            };
            const newOrder = {
                items: this.cart.items,
                details: {
                    name: this.cart.details.name,
                    phone: this.cart.details.phone,
                    address: this.cart.details.address,
                    comment: this.cart.details.comment,
                    timeToDeliver: `${this.cart.details.dateToDeliver} ${this.cart.details.timeToDeliver}`,
                },
            };
            this.totalPrice$.next(this.cart.details.totalPrice);
            this.orderService.makeOrder(newOrder).subscribe((value) => {
                if (value === 'OK') {
                    this.showPopup = true;
                    this.store.dispatch(orderConfirmed({ order: newOrder }));
                } else {
                    this.store.dispatch(
                        orderMakeFailed({ errorMessage: 'Заказ не был оформлен' })
                    );
                }
            });
        } else {
            this.formHasErrors = true;
        }
    }

    public orderComplete(): void {
        this.showPopup = false;
    }
}
