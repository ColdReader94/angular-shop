import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserDataState } from '../models/user-data-state.model';
import { AppState } from '../state.models';

@Injectable({
    providedIn: 'root',
})
export class UserDataSelectors {
    public selectUserDataState = createFeatureSelector<AppState, IUserDataState>(
        'userData'
    );
    public selectCurrentCity = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.currentCity
    );
    public selectSettingsError = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.settingsError
    );
    public selectCurrentUser = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.currentUser
    );
    public selectLoggedState = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.isLoggin
    );
    public selectItemsInCart = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.currentUser.cart
    );
    public selectItemsInFavourites = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.currentUser.favorites
    );
    public selectOrders = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.currentUser.orders
    );
    public selectToken = createSelector(
        this.selectUserDataState,
        (userDataState) => userDataState.token
    );
}
