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
    on(UserData.userFoundSuccessful, (state) => {
        return { ...state };
    }),
    on(UserData.userNotFound, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    }),
    on(UserData.userLoadSuccessful, (state, { user }) => {
        return { ...state, isLoggin: true, currentUser: user };
    }),
    on(UserData.userLogout, (state) => {
        return { ...state, currentUser: initialUserData.currentUser, isLoggin: false };
    }),
    on(UserData.userLoadFailed, (state, { errorMessage }) => {
        return { ...state, settingsError: errorMessage };
    })
);

export function userDataReducer(state: IUserDataState, action: Action): IUserDataState {
    return reducer(state, action);
}
