import { createAction, props } from '@ngrx/store';

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
    props<{ error: string }>()
);
