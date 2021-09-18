import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { IBaseCategory } from 'src/app/core/models/categories.model';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { loadCategoriesFailed } from 'src/app/redux/actions/categories.actions';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { AppState } from 'src/app/redux/state.models';
import { Paths } from 'src/app/shared/paths';
import { sortTypes } from 'src/app/shared/sortTypes';
import { SortService } from '../../services/sort.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
    public id = '';
    public items: IGoodsBaseItem[] = [];
    public categoryName = '';
    public subCategories: IBaseCategory[] = [];
    private pageCounter = 0;
    private itemsPerPage = 10;
    private pages = 0;
    private routeSubsriptions!: Subscription;
    private sortType = '';
    private sortDirection = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private httpService: HttpRequestsService,
        private sorting: SortService,
        private store: Store<AppState>,
        private categoriesSelectors: CategoriesSelectors
    ) {}

    ngOnInit(): void {
        this.routeSubsriptions = this.route.paramMap
            .pipe(
                switchMap((params) => params.getAll('id1')),
                mergeMap((id) => {
                    this.id = id;
                    return this.store.select(
                        this.categoriesSelectors.selectCategories
                    );
                }),
                mergeMap((category) => {
                    const foundCategory = category.find((item) => (item.id === this.id));
                    this.subCategories = foundCategory?.subCategories || [];
                    this.categoryName = foundCategory
                        ? foundCategory.name
                        : this.categoryName;
                        return this.httpService.getCategoryGoods(this.id);
                }),
                catchError(() => {
                   return of(this.store.dispatch(loadCategoriesFailed({ errorMessage: 'Не удалось загрузить товары' })));
                })
            )
            .subscribe((data) => {
                this.items = [];
                this.pages = Math.ceil((data as IGoodsBaseItem[]).length / this.itemsPerPage);
                this.loadItems();
            });
    }

    ngOnDestroy(): void {
        this.routeSubsriptions.unsubscribe();
    }


    public loadItems(): void {
        this.httpService
            .getCategoryGoods(
                this.id,
                this.pageCounter * this.itemsPerPage,
                this.itemsPerPage
            )
            .subscribe((value) => {
                if (value.length) {
                    this.items = this.sorting.sort(this.items.concat(value), this.sortType as sortTypes, this.sortDirection);
                } else {
                    this.router.navigate([Paths.NotFound]);
                }
            });
    }

    public loadMoreItems(): void {
        if (this.pageCounter < this.pages - 1) {
            this.pageCounter++;
            this.loadItems();
        }
    }

    public isActiveBtn(): boolean {
        return this.pages - this.pageCounter - 1 === 0;
    }

    public sortChange(type: sortTypes): void {
       this.sortType = type;
       this.sortDirection = !this.sortDirection;
       this.items = this.sorting.sort(this.items, type, this.sortDirection);
    }
}
