import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { FavouriteTogglerService } from 'src/app/shared/services/favourite-toggler.service';
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
                    map(
                        (value) => UserActions.changeCitySuccessful({ city: value.city }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                UserActions.changeCityFailed({
                                    errorMessage: `${error.status} ${error.statusText}
                        : City is not detected`,
                                })
                            )
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
                    map((value) => UserActions.userFoundSuccessful({ tokenValue: value.token })),
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
                this.httpRequest.getUserInfo(data.tokenValue).pipe(
                    tap((value) => {
                        this.loginService.setToLocalStorage({ ...value, token: data.tokenValue });
                    }),
                    map((value) => UserActions.userLoadSuccessful({ user: value })),
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
                        this.loginService.setToLocalStorage({
                            ...data.user,
                            token: value.token,
                        });
                        return UserActions.userRegisterSuccessful({
                            user: { ...data.user, token: value.token },
                        });
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

    public workWithFavourites: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.tryToAddToFavourite),
            switchMap((data) =>
                this.favouriteService.addToFavourite(data.itemId).pipe(
                    map(() => {
                        return UserActions.addedToFavourite({ itemId: data.itemId });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.addToFavouriteFailed({
                                errorMessage: `${error.status} ${error.statusText}: Item was not added to favourite.
                            Maybe you is not logged in`,
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
        private loginService: LoginService,
        private favouriteService: FavouriteTogglerService
    ) {}
}
