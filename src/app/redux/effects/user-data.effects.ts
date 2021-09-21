import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { OrderHandlingService } from 'src/app/orders/services/order-handling.service';
import { FavouriteTogglerService } from 'src/app/shared/services/favourite-toggler.service';
import { workWithCartService } from 'src/app/shared/services/work-with-cart.service';
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
                    map((value) =>
                        UserActions.userFoundSuccessful({ tokenValue: value.token })
                    ),
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
                        this.loginService.setToLocalStorage(
                            { ...value },
                            data.tokenValue
                        );
                    }),
                    map((value) =>
                        UserActions.userLoadSuccessful({
                            user: value,
                            authToken: data.tokenValue,
                        })
                    ),
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
                        this.loginService.setToLocalStorage(
                            { ...data.user },
                            value.token
                        );
                        return UserActions.userCompleteRegister();
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
            switchMap((data) => {
                if (data.isFavorite) {
                    return this.favouriteService
                        .addToFavourite(data.itemStatusChange)
                        .pipe(
                            map(() => {
                                return UserActions.addedToFavourite({
                                    itemStatusChange: data.itemStatusChange,
                                });
                            }),
                            catchError((error: HttpErrorResponse) =>
                                of(
                                    UserActions.addToFavouriteFailed({
                                        errorMessage: `${error.status} ${error.statusText}: Item was not added to favourite.
                                Maybe you is not logged in`,
                                    })
                                )
                            )
                        );
                }
                return this.favouriteService.deleteFavourite(data.itemStatusChange).pipe(
                    map(() => {
                        return UserActions.removedFromFavourite({
                            itemStatusChange: data.itemStatusChange,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.addToFavouriteFailed({
                                errorMessage: `${error.status} ${error.statusText}: Item was not removed to favourite.
                            Maybe you is not logged in`,
                            })
                        )
                    )
                );
            })
        )
    );

    public workWithCart: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.tryToAddToCart),
            switchMap((data) => {
                if (data.isInCart) {
                    return this.cartService.addToCart(data.itemStatusChange).pipe(
                        map(() => {
                            return UserActions.addedToCart({
                                itemStatusChange: data.itemStatusChange,
                            });
                        }),
                        catchError((error: HttpErrorResponse) =>
                            of(
                                UserActions.addToCartFailed({
                                    errorMessage: `${error.status} ${error.statusText}: Item was not added to cart.
                                Maybe you is not logged in`,
                                })
                            )
                        )
                    );
                }
                return this.cartService.deleteFromCart(data.itemStatusChange).pipe(
                    map(() => {
                        return UserActions.removedFromCart({
                            itemStatusChange: data.itemStatusChange,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.addToCartFailed({
                                errorMessage: `${error.status} ${error.statusText}: Item was not deleted from cart.`,
                            })
                        )
                    )
                );
            })
        )
    );

    public addOrder: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.tryAddOrder),
            switchMap((data) =>
                this.orderService.makeOrder(data.order).pipe(
                    map(() => UserActions.orderConfirmed({ order: data.order })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userLoadFailed({
                                errorMessage: `${error.status} ${error.statusText}: Failed to make order`,
                            })
                        )
                    )
                )
            )
        )
    );

    public changeOrder: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateOrder),
            switchMap((data) =>
                this.orderService.changeOrder(data.order).pipe(
                    map(() => UserActions.orderUpdated({ order: data.order })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userLoadFailed({
                                errorMessage: `${error.status} ${error.statusText}: Failed to change order`,
                            })
                        )
                    )
                )
            )
        )
    );

    public deleteOrder: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.removeOrder),
            switchMap((data) =>
                this.orderService.deleteOrder(data.order.id as string).pipe(
                    map(() =>
                        UserActions.removeOrder({ id: data.id, order: data.order })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userLoadFailed({
                                errorMessage: `${error.status} ${error.statusText}: Failed to remove order`,
                            })
                        )
                    )
                )
            )
        )
    );

    public loadUserData: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.userDataLoad),
            switchMap(() =>
                this.httpRequest.getUserInfo('').pipe(
                    map((value) => UserActions.userInfoGetSuccessful({ user: value })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            UserActions.userLoadFailed({
                                errorMessage: `${error.status} ${error.statusText}: Failed to remove order`,
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
        private favouriteService: FavouriteTogglerService,
        private cartService: workWithCartService,
        private orderService: OrderHandlingService
    ) {}
}
