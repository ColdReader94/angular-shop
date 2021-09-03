import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, ISettingsState } from '../state.models';

@Injectable({
    providedIn: 'root',
})
export class SettingsSelectors {
    public selectSettingsState = createFeatureSelector<AppState, ISettingsState>('settings');
    public selectCurrentCity = createSelector(
        this.selectSettingsState,
        (settingsState) => settingsState.currentCity
    );
    public selectSettingsError= createSelector(
        this.selectSettingsState,
        (settingsState) => settingsState.settingsError
    );
}
