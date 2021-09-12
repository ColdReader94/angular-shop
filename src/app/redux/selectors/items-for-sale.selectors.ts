import { Injectable } from '@angular/core';
import { createFeatureSelector } from '@ngrx/store';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { AppState } from '../state.models';

@Injectable({
    providedIn: 'root',
})
export class ItemsForSaleSelectors {
    public selectItemsForSale = createFeatureSelector<AppState, IGoodsBaseItem[]>('itemsForSale');
}
