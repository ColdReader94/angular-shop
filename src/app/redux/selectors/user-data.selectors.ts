import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, IUserDataState } from '../state.models';

@Injectable({
    providedIn: 'root',
})
export class SettingsSelectors {
    public selectUserDataState = createFeatureSelector<AppState, IUserDataState>('userData');
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
}
