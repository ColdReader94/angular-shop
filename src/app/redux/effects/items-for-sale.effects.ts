import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import * as ItemsForSale from '../actions/items-for-sale.actions';

const CATEGORY_FOR_SALE = 'телевизор';

@Injectable({
    providedIn: 'root',
})
export class ItemsForSaleEffects {
    public getItemsForSale: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ItemsForSale.loadItemsForSale),
            switchMap(() =>
                this.httpRequest.searchGoods(CATEGORY_FOR_SALE).pipe(
                    map((value) =>
                        ItemsForSale.loadItemsForSaleSuccessful({ loadedItems: value })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ItemsForSale.loadItemsForSaleFailed({
                                errorMessage: `${error.status} ${error.statusText}`,
                            })
                        )
                    )
                )
            )
        )
    );

    constructor(private actions$: Actions, private httpRequest: HttpRequestsService) {}
}
