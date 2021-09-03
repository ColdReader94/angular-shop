import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import {
    changeCity,
    changeCityFailed,
    changeCitySuccessful,
} from '../actions/settings.actions';

@Injectable({ 
    providedIn: 'root',
})
export class cardsEffects {
    public getCurrentCity: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(changeCity),
            switchMap((data) =>
                this.httpRequest.getGeolocation(data.coords).pipe(
                    map(value => changeCitySuccessful({ city: value })),
                    catchError((error: Error) => of(changeCityFailed({ error: error.message })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private httpRequest: HttpRequestsService
    ) {}
}
