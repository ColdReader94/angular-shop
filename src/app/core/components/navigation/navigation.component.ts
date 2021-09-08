import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';
import { IUser } from '../../models/user.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    public isPopupShow = false;
    public currentUser$!: Observable<IUser>;
    public isLoggedIn$!: Observable<boolean>;

    constructor(private store: Store<AppState>, public selectors: UserDataSelectors, public loginService: LoginService) {}

    ngOnInit(): void {
        this.loginService.loginCheck();
        this.currentUser$ = this.store.select(this.selectors.selectCurrentUser);
        this.isLoggedIn$ = this.store.select(this.selectors.selectLoggedState);
    }

    public popupShow(): void {
        this.isPopupShow = true;
    }

    public popupClose(): void {
        this.isPopupShow = false;
    }
}
