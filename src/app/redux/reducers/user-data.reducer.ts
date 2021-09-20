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
        return {
            ...state,
            isLoggin: true,
            currentUser: { ...user },
        };
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
    on(UserData.userLoadSuccessful, (state, { user, authToken }) => {
        return {
            ...state,
            isLoggin: true,
            token: authToken,
            currentUser: { ...user },
        };
    }),
    on(UserData.userLogout, (state) => {
        return { ...state, currentUser: { ...state.currentUser,
             token: '', favorites: [], cart: []  }, isLoggin: false };
    }),
    on(UserData.userLoadFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.tryToAddToFavourite, (state) => {
        return { ...state };
    }),
    on(UserData.addedToFavourite, (state, { itemStatusChange: item }) => {
        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                favourites: [...state.currentUser.favorites, item],
            },
        };
    }),
    on(UserData.addToFavouriteFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.tryToAddToCart, (state) => {
        return { ...state };
    }),
    on(UserData.addedToCart, (state, { itemStatusChange: item }) => {
        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                cart: [...state.currentUser.cart, item],
            },
        };
    }),
    on(UserData.removedFromCart, (state, { itemStatusChange: item }) => {
        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                cart: state.currentUser.cart.filter(itemInCart => itemInCart !== item),
            },
        };
    }),
    on(UserData.removedFromFavourite, (state, { itemStatusChange: item }) => {
        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                favorites: state.currentUser.favorites.filter(itemInFavorites => itemInFavorites !== item),
            },
        };
    }),
    on(UserData.addToCartFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.orderConfirmed, (state) => {
        return {
            ...state,
            currentUser: { ...state.currentUser, cart: [] },
        };
    }),
    on(UserData.orderMakeFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.clearErrorMessage, (state) => {
        return { ...state, settingsError: '' };
    })
);

export function userDataReducer(state: IUserDataState, action: Action): IUserDataState {
    return reducer(state, action);
}
