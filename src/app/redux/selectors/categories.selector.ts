import { Injectable } from '@angular/core';
import { createFeatureSelector } from '@ngrx/store';
import { ICategories } from '../../core/models/categories.model';
import { AppState } from '../state.models';

@Injectable({
    providedIn: 'root',
})
export class CategoriesSelectors {
    public selectCategories = createFeatureSelector<AppState, ICategories[]>(
        'categories'
    );
}
