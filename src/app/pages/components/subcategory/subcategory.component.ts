import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { Paths } from 'src/app/shared/paths';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit {
  public id = '';
  public items: IGoodsBaseItem[] = [];
  public categoryName = '';
  private pageCounter = 0;
  private itemsPerPage = 10;
  private pages = 0;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private httpService: HttpRequestsService
  ) {}

  ngOnInit(): void {
      this.route.paramMap
          .pipe(
              switchMap((params) => params.getAll('id')),
              mergeMap((id) => {
                  this.id = id;
                  return this.httpService.getCategories();
              }),
              mergeMap((category) => {
                  const foundCategory = category.find((item) => (item.id === this.id));
                  this.categoryName = foundCategory
                      ? foundCategory.name
                      : this.categoryName;
                  return this.httpService.getCategoryGoods(this.id);
              })
          )
          .subscribe((data) => {
              this.items = [];
              this.pages = Math.ceil(data.length / this.itemsPerPage);
              this.loadItems();
          });
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
                  this.items = this.items.concat(value);
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
}
