import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { tryToAddToFavourite } from 'src/app/redux/actions/user-data.actions';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit, OnDestroy {
    public good: IGoodsBaseItem = {} as IGoodsBaseItem;
    public categoryName = '';
    public subCategoryName = '';
    private routeSubsriptions!: Subscription;
    private id = '';

    constructor(
        private httpService: HttpRequestsService,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private categoriesSelectors: CategoriesSelectors
    ) {}

    ngOnInit(): void {
        this.routeSubsriptions = this.route.paramMap
            .pipe(
                switchMap((params) => params.getAll('id')),
                mergeMap((id) => {
                    this.id = id;
                    return this.httpService.getGoods(this.id).pipe(
                        switchMap((value) => {
                            this.good = value;
                            return this.store.select(
                                this.categoriesSelectors.selectCategories
                            );
                        })
                    );
                })
            )
            .subscribe((data) => {
                const category = data.find((item) => item.id === this.good.category);
                const subCategory = category?.subCategories.find(
                    (item) => item.id === this.good.subCategory
                );
                if (category && subCategory) {
                    this.categoryName = category.name;
                    this.subCategoryName = subCategory.name;
                }
            });
    }

    ngOnDestroy(): void {
        this.routeSubsriptions.unsubscribe();
    }

    public workWithFavourite(id: string): void {
        this.store.dispatch(tryToAddToFavourite({ itemId: id }));
      }
}
