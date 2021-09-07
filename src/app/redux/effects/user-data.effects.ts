import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import {
    changeCity,
    changeCityFailed,
    changeCitySuccessful,
    userFoundSuccessful,
    userLoadFailed,
    userLoadSuccessful,
    userLogin,
    userNotFound,
    userRegister,
    userRegisterFailed,
    userRegisterSuccessful,
} from '../actions/user-data.actions';

@Injectable({
    providedIn: 'root',
})
export class userDataEffects {
    public getCurrentCity: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(changeCity),
            switchMap((data) =>
                this.httpRequest.getGeolocation(data.coords).pipe(
                    map((value) => changeCitySuccessful({ city: value })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            changeCityFailed({
                                errorMessage: `${error.status} ${error.statusText}
                        : City is not detected, please allow browser to detect your location`,
                            })
                        )
                    )
                )
            )
        )
    );

    public getCurrentUser: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(userLogin),
            switchMap((data) =>
                this.httpRequest.findUser(data.login, data.password).pipe(
                    map((value) => userFoundSuccessful(value)),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            userNotFound({
                                errorMessage: `${error.status} ${error.statusText}: Wrong login or password`,
                            })
                        )
                    )
                )
            )
        )
    );

    public foundUserByToken: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(userFoundSuccessful),
            switchMap((data) =>
                this.httpRequest.getUserInfo(data.token).pipe(
                    tap((value) => this.loginService.setToLocalStorage(value[0])),
                    map((value) => userLoadSuccessful({ user: value[0] })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            userLoadFailed({
                                errorMessage: `${error.status} ${error.statusText}: Failed to load user data`,
                            })
                        )
                    )
                )
            )
        )
    );

    public registerNewUser: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(userRegister),
            tap((data) => this.loginService.setToLocalStorage(data.user)),
            switchMap((data) =>
                this.httpRequest.registerUser(data.user).pipe(
                    map(() => userRegisterSuccessful({ user: data.user })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            userRegisterFailed({
                                errorMessage: `${error.status} ${error.statusText}: User has not been registered`,
                            })
                            
                        )
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private httpRequest: HttpRequestsService,
        private loginService: LoginService
    ) {}
}
