import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user.model';

export const changeCity = createAction(
    '[HEADER] CITY CHANGE',
    props<{ coords: GeolocationPosition }>()
);

export const changeCitySuccessful = createAction(
    '[HEADER] CITY WAS SUCCESSFULY CHANGED',
    props<{ city: string }>()
);

export const changeCityFailed = createAction(
    '[HEADER] CITY CHANGE FAILED',
    props<{errorMessage: string}>()
);

export const userRegister = createAction(
    '[LOGIN POPUP] TRY TO REGISTER NEW USER',
    props<{ user: IUser }>()
);

export const userRegisterSuccessful = createAction(
    '[LOGIN POPUP] NEW USER REGISTERED',
    props<{ user: IUser }>()
);

export const userRegisterFailed = createAction(
    '[LOGIN POPUP] NEW USER REGISTER FAILED',
     props<{errorMessage: string}>()
);

export const userLogin = createAction(
    '[LOGIN POPUP] USER IS TRY TO LOGIN',
    props<{ login: string, password: string }>()
);

export const userFoundSuccessful = createAction(
    '[LOGIN POPUP] USER IS EXISTS',
    props<{ token: string }>()
);

export const userNotFound = createAction(
    '[LOGIN POPUP] USER NOT FOUND',
     props<{errorMessage: string}>()
);

export const userLoadFailed = createAction(
    '[LOGIN POPUP] LOAD USER DATA FROM SERVER HAS FAILED',
     props<{errorMessage: string}>()
);

export const userLoadSuccessful = createAction(
    '[LOGIN POPUP] USER DATA LOAD',
    props<{ user: IUser }>()
);

export const userLogout = createAction(
    '[LOGIN DROP DOWN LIST] USER HAS LOGGED OUT'
);
