import { createAction, props } from '@ngrx/store';

export const changeCity = createAction(
    '[HEADER] CITY CHANGE',
    props<GeolocationCoordinates>()
);

export const changeCitySuccessful = createAction(
    '[HEADER] CITY WAS SUCCESSFULY CHANGED',
    props<{ city: string }>()
);

export const changeCityFailed = createAction(
    '[HEADER] CITY WAS SUCCESSFULY CHANGED',
    props<{ error: Error }>()
);
