import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import {
    debounceTime,
    map,
    filter,
    distinctUntilChanged,
    mergeAll,
    switchMap,
} from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { IBaseCategory, ICategories } from 'src/app/core/models/categories.model';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';
import { ISearchResults } from '../../models/search-results.model';
import { IUser } from '../../models/user.model';
import { HttpRequestsService } from '../../services/http-requests.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    host: {
        '(document:click)': 'onClick($event)',
    },
})
export class NavigationComponent implements OnInit {
    @ViewChild('searchField', { static: true })
    searchField!: ElementRef<HTMLInputElement>;
    @Output() catalogOpen = new EventEmitter();
    public isCatalogOpen = false;
    public isPopupShow = false;
    public searchResultsItems: ISearchResults | null = null;
    public currentUser$!: Observable<IUser>;
    public isLoggedIn$!: Observable<boolean>;
    public categories$!: Observable<ICategories[]>;

    constructor(
        private store: Store<AppState>,
        public userSelectors: UserDataSelectors,
        public loginService: LoginService,
        private categoriesSelectors: CategoriesSelectors,
        private httpService: HttpRequestsService
    ) {}

    ngOnInit(): void {
        this.loginService.loginCheck();
        this.currentUser$ = this.store.select(this.userSelectors.selectCurrentUser);
        this.isLoggedIn$ = this.store.select(this.userSelectors.selectLoggedState);
        this.categories$ = this.store.select(this.categoriesSelectors.selectCategories);
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchField.nativeElement, 'input')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map((event) => (<HTMLInputElement>event.target).value.toLowerCase()),
                filter((value) => value.length > 2),
                switchMap((data) =>
                    this.httpService.getCategories().pipe(
                        map((item) => {
                            const foundedCategories: ICategories[] = [];
                            const foundedSubCategories: IBaseCategory[] = [];
                            item.forEach((item) => {
                                item.subCategories.forEach((subCategory) => {
                                    if (subCategory.name.toLowerCase().includes(data)) {
                                        foundedSubCategories.push(subCategory);
                                    }
                                });
                                if (item.name.toLowerCase().includes(data)) {
                                    foundedCategories.push(item);
                                }
                            });
                            return this.httpService.searchGoods(data).pipe(
                                map((searchedGoods) => {
                                    return {
                                        categories: foundedCategories,
                                        subCategories: foundedSubCategories,
                                        goods: searchedGoods,
                                    };
                                })
                            );
                        })
                    )
                ),
                mergeAll()
            )
            .subscribe((value) => {
                this.searchResultsItems = value;
            });
    }

    public popupShow(): void {
        this.isPopupShow = true;
    }

    public popupClose(): void {
        this.isPopupShow = false;
    }

    public catalogToggle(): void {
        this.isCatalogOpen = !this.isCatalogOpen;
        this.catalogOpen.emit();
    }

    public clearSearchInput(): void {
        this.searchField.nativeElement.value = '';
    }

    public onClick(): void {
            this.searchResultsItems = null;
    }
}
