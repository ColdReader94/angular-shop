import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IOrder } from 'src/app/core/models/order.model';
import { removeOrder, updateOrder } from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-waitlist',
    templateUrl: './waitlist.component.html',
    styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent  {
    // public showPopup = false;
    // public orders$: Observable<IOrder[]> = of([]);
    // public odersData: IOrder[] = [{
    //     items: [],
    //     details: {
    //         totalPrice: 0,
    //         name: '',
    //         address: '',
    //         phone: '',
    //         timeToDeliver: '',
    //         dateToDeliver: '',
    //         comment: '',
    //     },
    // }];

    constructor(
        private store: Store<AppState>,
        private ordersSelector: UserDataSelectors
    ) {}

    // ngOnInit(): void {
    //     this.orders$ = this.store.select(this.ordersSelector.selectOrders);
    // }

    // public changeOrder(changedOrder: IOrder): void {
    //     this.store.dispatch(updateOrder({ order: changedOrder }));
    // }

    // public removeOrder(deletedOrder: IOrder): void {
    //     this.store.dispatch(
    //         removeOrder({ id: deletedOrder.id as string, order: deletedOrder })
    //     );
    // }
}
