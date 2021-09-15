import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/core/models/categories.model';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { AppState } from 'src/app/redux/state.models';
import { Paths } from 'src/app/shared/paths';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public categories$!: Observable<ICategories[]>;

  constructor(private store: Store<AppState>, public selectors: CategoriesSelectors, private router: Router) {}

    ngOnInit(): void {
       this.categories$ = this.store.select(this.selectors.selectCategories);
    }

    public navigate(categoryId: string, subcategoryId?: string): void {
        subcategoryId ?
        this.router.navigate([`${Paths.Category}${categoryId}`, subcategoryId]) :
        this.router.navigate([`${Paths.Category}${categoryId}`]);
    }
}
