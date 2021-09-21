import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ICart, IDetailsOrder, IOrder } from 'src/app/core/models/order.model';
import {
    removeOrder,
    updateOrder,
    userDataLoad,
} from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-waitlist',
    templateUrl: './waitlist.component.html',
    styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent {
    public formHasErrors = false;
    public orders$: Observable<IOrder[]> = of([]);
    public odersData: ICart[] = [
        {
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
        },
    ];

    public date = {
        day: '',
        time: '',
    };

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

    constructor(
        private store: Store<AppState>,
        private ordersSelector: UserDataSelectors
    ) {}

    ngOnInit(): void {
        this.orders$ = this.store.select(this.ordersSelector.selectOrders);
        this.store.dispatch(userDataLoad());
    }

    public changeOrder(changedOrder: IOrder): void {
        this.orderForm.value;
        if (this.orderForm.valid) {
            const updatedOrder = {
                ...changedOrder,
                details: {
                    ...(this.orderForm.value as IOrder),
                    timeToDeliver: `${
                        (<IDetailsOrder>this.orderForm.value).dateToDeliver
                    } ${(<IDetailsOrder>this.orderForm.value).timeToDeliver}`,
                },
            };
            this.store.dispatch(
                updateOrder({ order: updatedOrder as unknown as IOrder })
            );
        } else {
            this.formHasErrors = true;
        }
    }

    public removeOrder(deletedOrder: IOrder): void {
        this.store.dispatch(
            removeOrder({ id: deletedOrder.id as string, order: deletedOrder })
        );
    }

    public displayToggle(event: Event): void {
        (<HTMLElement>event.target)
            .querySelector('.order-item')
            ?.classList.toggle('active');
        (<HTMLElement>event.target)
            .querySelector('.order-item')
            ?.closest('.order')
            ?.classList.toggle('open');
    }

    public countTotalPrice(order: IOrder): number {
        return order.items.reduce(
            (sum, current) => sum + current.price * current.amount,
            0
        );
    }
}
