import { createReducer, on, Action } from '@ngrx/store';
import { initialSettingsState, ISettingsState } from '../state.models';
import * as Settings from '../actions/settings.actions';

const reducer = createReducer(
    initialSettingsState,
    on(Settings.changeCity, (state) => {
        return { ...state };
    }),
    on(Settings.changeCitySuccessful, (state, { city }) => {
        return { ...state, currentCity: city };
    }),
    on(Settings.changeCityFailed, (state, { error }) => {
        return { ...state, settingsError: error };
    })    
);

export function settingsReducer(state: ISettingsState, action: Action):  ISettingsState {
    return reducer(state, action);
}
