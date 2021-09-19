import { Injectable } from '@angular/core';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { sortTypes } from 'src/app/shared/sortTypes';

@Injectable({
    providedIn: 'root',
})
export class SortService {
    public sortDirection = false;
    public filterType = '';

    public sort(
        value: IGoodsBaseItem[],
        type: sortTypes,
        direction: boolean
    ): IGoodsBaseItem[] {
        this.sortDirection = direction;
        if (!value) {
            return [];
        }
        this.filterType = type;
        return value.sort(this.sortByField());
    }

    public sortByField() {
        return (a: IGoodsBaseItem, b: IGoodsBaseItem): number => {
            if (this.filterType === '') {
                return 0;
            }
            if (this.sortDirection) {
                return a[this.filterType as sortTypes] > b[this.filterType as sortTypes]
                    ? 1
                    : -1;
            }
            if (!this.sortDirection) {
                return a[this.filterType as sortTypes] < b[this.filterType as sortTypes]
                    ? 1
                    : -1;
            }
            return 0;
        };
    }
}
