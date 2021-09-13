import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
    public id = '';
    public items: IGoodsBaseItem[] = [];
  private itemsLength = 0;
  private pageCounter = 0;
  private itemsPerPage = 10;
  private pages = this.itemsLength / this.itemsPerPage;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private httpService: HttpRequestsService
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params) => params.getAll('id')))
            .subscribe((data) => {
              this.id = data;
              this.pageCounter = 0;
              this.httpService.getCategoryGoods(this.id).subscribe((value) => {
                this.itemsLength = value.length;
                console.log(this.pageCounter, this.itemsLength)
            });
            this.loadItems();
            this.pageCounter += this.itemsPerPage;
            });
    }

    public loadItems(): void {
        this.httpService
            .getCategoryGoods(this.id, this.pageCounter, this.itemsPerPage)
            .subscribe((value) => {
                if (value.length) {
                    this.items = value;
                } else {
                    // this.router.navigate([Paths.NotFound]);
                }
            });
    }

    public loadMoreItems(): void {
        if (this.pageCounter < this.itemsLength) {
          console.log(this.pageCounter, this.itemsLength)
          this.loadItems();
          this.pageCounter += this.itemsPerPage;
          if (this.pageCounter > this.itemsLength) {
this.pageCounter = Math.round(this.itemsLength);
          }
        }
    }

    public loadPrevious(): void {
        if (this.pageCounter > this.itemsPerPage) {
          this.pageCounter -= this.itemsPerPage;
          this.pageCounter = this.pageCounter < 0 ? 0 : this.pageCounter;
          console.log(this.pageCounter, this.itemsLength)
            this.loadItems();
            
        }
    }
}
