import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCategories } from 'src/app/redux/actions/categories.actions';
import { ICategories } from 'src/app/core/models/categories.model';
import { CategoriesSelectors } from 'src/app/redux/selectors/categories.selector';
import { AppState } from 'src/app/redux/state.models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    public categories$!: Observable<ICategories[]>;

    constructor(
        private store: Store<AppState>,
        private selectors: CategoriesSelectors,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categories$ = this.store.select(this.selectors.selectCategories);
        this.store.dispatch(loadCategories());
    }
}
