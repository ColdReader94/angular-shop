import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
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
                  return this.store.select(
                    this.categoriesSelectors.selectCategories
                );
              }),
              mergeMap((category) => {
                  const foundCategory = category.find((item) => (item.id === this.idCategory));
                  const foundSubCategory = foundCategory?.subCategories.find((item) => (item.id === this.idSubCategory));
                  this.categoryName = foundCategory
                      ? foundCategory.name
                      : this.categoryName;
                      this.subCategoryName = foundSubCategory
                      ? foundSubCategory.name
                      : this.subCategoryName;
                  return this.httpService.getSubCategoryGoods(this.idCategory, this.idSubCategory);
              })
          )
          .subscribe((data) => {
              this.items = [];
              this.pages = Math.ceil(data.length / this.itemsPerPage);
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
