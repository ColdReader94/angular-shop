import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { tryToAddToFavourite } from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
    public favoritesItems$!: Observable<IGoodsBaseItem[]>;

    constructor(
        private store: Store<AppState>,
        private favItemsSelector: UserDataSelectors,
        private httpService: HttpRequestsService
    ) {}

    ngOnInit(): void {
        this.favoritesItems$ = this.store
            .select(this.favItemsSelector.selectItemsInFavourites)
            .pipe(
                map((itemsIdArray) => {
                    const arr: IGoodsBaseItem[] = [];
                    itemsIdArray.map((itemId) =>
                        this.httpService
                            .getGoods(itemId)
                            .subscribe((item) => arr.push(item))
                    );
                    return arr;
                })
            );
    }

    public removeFromList(id: string, event: Event): void {
        (<Element>event.target).closest('.favourite-item')?.remove();
        this.store.dispatch(
            tryToAddToFavourite({
                itemStatusChange: id,
                isFavorite: false,
            })
        );
    }
}
