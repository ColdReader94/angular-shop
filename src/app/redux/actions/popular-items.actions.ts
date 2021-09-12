import { createAction, props } from '@ngrx/store';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';

export const loadPopularItems = createAction(
    '[APP] LOAD POPULAR ITEMS'
);

export const loadPopularItemsSuccessful = createAction(
    '[APP] POPULAR ITEMS LOADED',
    props<{ loadedItems: IGoodsBaseItem[] }>()
);

export const loadPopularItemsFailed = createAction(
    '[APP] POPULAR ITEMS LOAD FAILED',
    props<{ errorMessage: string }>()
);
