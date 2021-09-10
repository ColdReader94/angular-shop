import { createAction, props } from '@ngrx/store';
import { ICategories } from '../../core/models/categories.model';

export const loadCategories = createAction(
    '[HEADER] LOAD CATEGORIES'
);

export const loadCategoriesSuccessful = createAction(
    '[HEADER] CATEGORIES LOADED',
    props<{ loadedCategories: ICategories[] }>()
);

export const loadCategoriesFailed = createAction(
    '[HEADER] CATEGORIES LOAD FAILED',
    props<{ errorMessage: string }>()
);
