import { createReducer, on, Action } from '@ngrx/store';
import * as PopularItems from '../actions/popular-items.actions';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';

const reducer = createReducer(
    [] as IGoodsBaseItem[],
    on(PopularItems.loadPopularItems, (state) => {
        return [ ...state ];
    }),
    on(PopularItems.loadPopularItemsSuccessful, (_state, { loadedItems }) => {
        return [ ...loadedItems];
    })
);

export function popularItemsReducer(state: IGoodsBaseItem[], action: Action): IGoodsBaseItem[] {
    return reducer(state, action);
}
