import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import * as CategoriesActions from '../actions/categories.actions';

@Injectable({
    providedIn: 'root',
})
export class CategoriesEffects {
    public getCategories: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActions.loadCategories),
            switchMap(() =>
                this.httpRequest.getCategories().pipe(
                    map((value) =>
                        CategoriesActions.loadCategoriesSuccessful({
                            loadedCategories: value,
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            CategoriesActions.loadCategoriesFailed({
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
