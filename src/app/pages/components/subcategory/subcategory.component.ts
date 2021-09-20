import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { loadCategoriesFailed } from 'src/app/redux/actions/categories.actions';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { AppState } from 'src/app/redux/state.models';
import { Paths } from 'src/app/shared/paths';
import { sortTypes } from 'src/app/shared/sortTypes';
import { SortService } from '../../services/sort.service';

@Component({
    selector: 'app-subcategory',
    templateUrl: './subcategory.component.html',
    styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit, OnDestroy {
    public idCategory = '';
    public idSubCategory = '';
    public items: IGoodsBaseItem[] = [];
    public categoryName = '';
    public subCategoryName = '';
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
                switchMap((params) => {
                    this.idCategory = params.get('id1') as string;
                    this.idSubCategory = params.get('id2') as string;
                    return this.store.select(this.categoriesSelectors.selectCategories);
                }),
                switchMap((category) => {
                    const foundCategory = category.find(
                        (item) => item.id === this.idCategory
                    );
                    const foundSubCategory = foundCategory?.subCategories.find(
                        (item) => item.id === this.idSubCategory
                    );
                    this.categoryName = foundCategory
                        ? foundCategory.name
                        : this.categoryName;
                    this.subCategoryName = foundSubCategory
                        ? foundSubCategory.name
                        : this.subCategoryName;
                    return this.httpService.getSubCategoryGoods(
                        this.idCategory,
                        this.idSubCategory
                    );
                }),
                catchError(() => {
                    return of(
                        this.store.dispatch(
                            loadCategoriesFailed({
                                errorMessage: 'Не удалось загрузить товары',
                            })
                        )
                    );
                })
            )
            .subscribe((data) => {
                this.items = [];
                this.pages = Math.ceil(
                    (data as IGoodsBaseItem[]).length / this.itemsPerPage
                );
                this.loadItems();
            });
    }

    ngOnDestroy(): void {
        this.routeSubsriptions.unsubscribe();
    }

    public loadItems(): void {
        this.httpService
            .getSubCategoryGoods(
                this.idCategory,
                this.idSubCategory,
                this.pageCounter * this.itemsPerPage,
                this.itemsPerPage
            )
            .subscribe((value) => {
                if (value.length) {
                    this.items = this.sorting.sort(
                        this.items.concat(value),
                        this.sortType as sortTypes,
                        this.sortDirection
                    );
                     //TODO REMOVE FOREACH STATEMENT AFTER CROSSCHECK (this image was removed from shopserver)
                this.items.forEach(item => {
                    if (item.imageUrls.length && 
                        item.imageUrls[0].includes('cdn21vek.by/img/galleries/6013/346/preview_b/500_mebelico_05_5fdc54de5510e.jpeg')) {
                        item.imageUrls[0] = '';
                    }
                });
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
