import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/redux/models/categories.model';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { AppState } from 'src/app/redux/state.models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  public categories$!: Observable<ICategories[]>;

  constructor(private store: Store<AppState>, public selectors: CategoriesSelectors) {}

    ngOnInit(): void {
       this.categories$ = this.store.select(this.selectors.selectCategories);
    }

}
