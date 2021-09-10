import { createReducer, on, Action } from '@ngrx/store';
import * as Categories from '../actions/categories.actions';
import { ICategories, initialCategories } from '../../core/models/categories.model';

const reducer = createReducer(
    initialCategories as ICategories[],
    on(Categories.loadCategories, (state) => {
        return [ ...state ];
    }),
    on(Categories.loadCategoriesSuccessful, (_state, { loadedCategories }) => {
        return [ ...loadedCategories ];
    })
);

export function categoriesReducer(state: ICategories[], action: Action): ICategories[] {
    return reducer(state, action);
}
