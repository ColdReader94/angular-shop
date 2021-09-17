import { createReducer, on, Action } from '@ngrx/store';
import { initialUserData, IUserDataState } from '../models/user-data-state.model';
import * as UserData from '../actions/user-data.actions';

const reducer = createReducer(
    initialUserData,
    on(UserData.changeCity, (state) => {
        return { ...state };
    }),
    on(UserData.changeCitySuccessful, (state, { city }) => {
        return { ...state, currentCity: city };
    }),
    on(UserData.changeCityFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.userRegister, (state) => {
        return { ...state };
    }),
    on(UserData.userRegisterSuccessful, (state, { user }) => {
        return { ...state, isLoggin: true, currentUser: user };
    }),
    on(UserData.userLogin, (state) => {
        return { ...state };
    }),
    on(UserData.userFoundSuccessful, (state, { tokenValue }) => {
        return { ...state, currentUser: { ...state.currentUser, token: tokenValue } };
    }),
    on(UserData.userNotFound, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.userLoadSuccessful, (state, { user }) => {
        return { ...state, isLoggin: true, currentUser: { ...user, token: state.currentUser.token } };
    }),
    on(UserData.userLogout, () => {
        return { ...initialUserData, isLoggin: false };
    }),
    on(UserData.userLoadFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.tryToAddToFavourite, (state) => {
        return { ...state };
    }),
    on(UserData.addedToFavourite, (state, { itemId: id }) => {
        return { ...state, currentUser: { ...state.currentUser, favourites: [...state.currentUser.favorites, id] } };
    }),
    on(UserData.addToFavouriteFailed,  (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.clearErrorMessage, (state) => {
        return { ...state, settingsError: '' };
    })
);

export function userDataReducer(state: IUserDataState, action: Action): IUserDataState {
    return reducer(state, action);
}
