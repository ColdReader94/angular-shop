import { createReducer, on, Action } from '@ngrx/store';
import * as ItemsForSale from '../actions/items-for-sale.actions';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';

const reducer = createReducer(
    [] as IGoodsBaseItem[],
    on(ItemsForSale.loadItemsForSale, (state) => {
        return [...state];
    }),
    on(ItemsForSale.loadItemsForSaleSuccessful, (_state, { loadedItems }) => {
        return [...loadedItems];
    })
);

export function itemsForSaleReducer(
    state: IGoodsBaseItem[],
    action: Action
): IGoodsBaseItem[] {
    return reducer(state, action);
}
