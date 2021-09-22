import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import {
    addToFavouriteFailed,
    tryToAddToCart,
    tryToAddToFavourite,
} from 'src/app/redux/actions/user-data.actions';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit, OnDestroy {
    public isFavorite = false;
    public isInCart = false;
    public good: IGoodsBaseItem = {} as IGoodsBaseItem;
    public categoryName = '';
    public subCategoryName = '';
    private routeSubsriptions!: Subscription;
    private id = '';
    private isLoggedSubscription!: Subscription;
    private isLogged!: boolean;

    constructor(
        private httpService: HttpRequestsService,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private categoriesSelectors: CategoriesSelectors,
        private isloggedSelector: UserDataSelectors
    ) {}

    ngOnInit(): void {
        this.isLoggedSubscription = this.store
            .select(this.isloggedSelector.selectLoggedState)
            .subscribe((value) => {
                this.isLogged = value;
            });
        this.routeSubsriptions = this.route.paramMap
            .pipe(
                switchMap((params) => params.getAll('id')),
                mergeMap((id) => {
                    this.id = id;
                    return this.httpService.getGoods(this.id).pipe(
                        switchMap((value) => {
                            //TODO REMOVE IF STATEMENT AFTER CROSSCHECK (this image was removed from shopserver)
                            if (
                                value.imageUrls.length &&
                                value.imageUrls[0].includes(
                                    'cdn21vek.by/img/galleries/6013/346/preview_b/500_mebelico_05_5fdc54de5510e.jpeg'
                                )
                            ) {
                                value.imageUrls[1] = 'assets/images/default-img.jpg';
                                value.imageUrls[0] = 'assets/images/default-img.jpg';
                            }
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
        this.isLoggedSubscription.unsubscribe();
    }

    public workWithFavourite(): void {
        if (this.isLogged) {
            this.isFavorite = !this.isFavorite;
            this.store.dispatch(
                tryToAddToFavourite({
                    itemStatusChange: this.good.id,
                    isFavorite: this.isFavorite,
                })
            );
        } else {
            this.store.dispatch(
                addToFavouriteFailed({
                    errorMessage: 'Пожалуйста, авторизуйтесь для работы с избранным',
                })
            );
        }
    }

    public workWithCart(): void {
        if (this.isLogged) {
            this.isInCart = !this.isInCart;
            this.store.dispatch(
                tryToAddToCart({
                    itemStatusChange: this.good.id,
                    isInCart: this.isInCart,
                })
            );
        } else {
            this.store.dispatch(
                addToFavouriteFailed({
                    errorMessage: 'Пожалуйста, авторизуйтесь для работы с корзиной',
                })
            );
        }
    }
}
