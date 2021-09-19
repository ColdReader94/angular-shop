import { createAction, props } from '@ngrx/store';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';

export const loadItemsForSale = createAction('[APP] LOAD ITEMS FOR SALE');

export const loadItemsForSaleSuccessful = createAction(
    '[APP] ITEMS FOR SALE LOADED',
    props<{ loadedItems: IGoodsBaseItem[] }>()
);

export const loadItemsForSaleFailed = createAction(
    '[APP] ITEMS FOR SALE LOAD FAILED',
    props<{ errorMessage: string }>()
);
