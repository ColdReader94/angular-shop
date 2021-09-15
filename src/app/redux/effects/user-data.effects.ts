import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import * as UserActions from '../actions/user-data.actions';

@Injectable({
    providedIn: 'root',
})
export class userDataEffects {
    public getCurrentCity: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.changeCity),
            switchMap(() =>
                this.httpRequest.getLocationByIp().pipe(
                    switchMap(value => {
                       return this.httpRequest.getGeolocation(value.latitude, value.longitude).pipe(
                            map((value) => UserActions.changeCitySuccessful({ city: value }))
                        );
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.changeCityFailed({
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
            ofType(UserActions.userLogin),
            switchMap((data) =>
                this.httpRequest.findUser(data.login, data.password).pipe(
                    map((value) => UserActions.userFoundSuccessful(value)),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userNotFound({
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
            ofType(UserActions.userFoundSuccessful),
            switchMap((data) =>
                this.httpRequest.getUserInfo(data.token).pipe(
                    tap((value) => this.loginService.setToLocalStorage(value[0])),
                    map((value) => UserActions.userLoadSuccessful({ user: value[0] })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userLoadFailed({
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
            ofType(UserActions.userRegister),
            switchMap((data) =>
                this.httpRequest.registerUser(data.user).pipe(
                    map((value) => {
                        this.loginService.setToLocalStorage({ ...data.user, token: value.token });
                        return  UserActions.userRegisterSuccessful({ user: { ...data.user, token: value.token } });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userRegisterFailed({
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
