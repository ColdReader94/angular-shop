import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import * as PopularItems from '../actions/popular-items.actions';


const POPULAR_CATEGORY = 'electronics';
const START_FROM = 0;
const MAX_ITEMS = 18;

@Injectable({
    providedIn: 'root',
})
export class PopularItemsEffects {
    public getPopularItems: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(PopularItems.loadPopularItems),
            switchMap(() =>
                this.httpRequest.getCategoryGoods(POPULAR_CATEGORY, START_FROM, MAX_ITEMS).pipe(
                    map((value) => PopularItems.loadPopularItemsSuccessful({ loadedItems: value })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            PopularItems.loadPopularItemsFailed({
                                errorMessage: `${error.status} ${error.statusText}`,
                            })
                        )
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private httpRequest: HttpRequestsService
    ) {}
}
