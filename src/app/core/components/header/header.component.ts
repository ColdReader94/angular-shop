import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadItemsForSale } from 'src/app/redux/actions/items-for-sale.actions';
import { loadPopularItems } from 'src/app/redux/actions/popular-items.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public errorPopup = false;
    public contactsDropDown = false;
    public catalogIsShowed = false;
    public error$!: Observable<string>;

    constructor(private store: Store<AppState>, private selectors: UserDataSelectors) {}

    ngOnInit(): void {
        this.error$ = this.store.select(this.selectors.selectSettingsError);
        this.error$.subscribe((value) => {
            if (value) {
                this.showErrorPoppup();
            }
        });
        this.store.dispatch(loadItemsForSale());
        this.store.dispatch(loadPopularItems());
    }

    public contactsDropDownToggle(): void {
        this.contactsDropDown = !this.contactsDropDown;
    }

    public showErrorPoppup(): void {
        this.errorPopup = true;
    }

    public hideErrorPopup(): void {
        this.errorPopup = false;
    }

    public catalogShowToggle(): void {
        this.catalogIsShowed = !this.catalogIsShowed;
    }
}
