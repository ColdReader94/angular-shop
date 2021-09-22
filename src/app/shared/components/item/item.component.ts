import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import {
    addToFavouriteFailed,
    tryToAddToCart,
    tryToAddToFavourite,
} from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
    @Input() value!: IGoodsBaseItem;

    public isFavorite = false;
    public isInCart = false;
    private isLoggedSubscription!: Subscription;
    private isLogged!: boolean;

    constructor(
        private store: Store<AppState>,
        private isloggedSelector: UserDataSelectors
    ) {}

    ngOnInit(): void {
        this.isLoggedSubscription = this.store
            .select(this.isloggedSelector.selectLoggedState)
            .subscribe((value) => {
                this.isLogged = value;
                this.isFavorite = this.value.isFavorite;
                this.isInCart = this.value.isInCart;
            });
        this.isFavorite = this.value.isFavorite;
        this.isInCart = this.value.isInCart;
    }

    ngOnDestroy(): void {
        this.isLoggedSubscription.unsubscribe();
    }

    public workWithFavourite(): void {
        if (this.isLogged) {
            this.isFavorite = !this.isFavorite;
            this.store.dispatch(
                tryToAddToFavourite({
                    itemStatusChange: this.value.id,
                    isFavorite: this.isFavorite,
                })
            );
        } else {
            this.store.dispatch(
                addToFavouriteFailed({
                    errorMessage: 'Пожалуйста, авторизуйтесь для работы с избранным',
                })
            );
        }
    }

    public workWithCart(): void {
        if (this.isLogged) {
            this.isInCart = !this.isInCart;
            this.store.dispatch(
                tryToAddToCart({
                    itemStatusChange: this.value.id,
                    isInCart: this.isInCart,
                })
            );
        } else {
            this.store.dispatch(
                addToFavouriteFailed({
                    errorMessage: 'Пожалуйста, авторизуйтесь для работы с корзиной',
                })
            );
        }
    }
}
