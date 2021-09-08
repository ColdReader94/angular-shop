import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { userFoundSuccessful, userLogout } from 'src/app/redux/actions/user-data.actions';
import { AppState } from 'src/app/redux/state.models';

const CURRENT_USER = 'currentUser';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    public isLoggedIn$: Observable<boolean>;
    private isLogged$ = new BehaviorSubject(false);

    constructor(
        private store: Store<AppState>,
        private httpService: HttpRequestsService
    ) {
        this.isLoggedIn$ = this.isLogged$.asObservable();
    }

    public setToLocalStorage(user: IUser): void {
        const userRegistrationInfo = { firstName: user.firstName, lastName: user.lastName, token: user.token };
        localStorage.setItem(CURRENT_USER, JSON.stringify(userRegistrationInfo));
    }

    public loginCheck(): void {
        if (localStorage.getItem(CURRENT_USER)) {
            const userJson = localStorage.getItem(CURRENT_USER) as string;
            const user = JSON.parse(userJson) as IUser;
            if (user.token) {
                this.userExistsCheck(user);
            }
        }
    }

    public userExistsCheck(currentUser: IUser): void {
        this.httpService.getUserInfo(currentUser.token).subscribe((value) => {
            if (value[0]) {
                this.store.dispatch(userFoundSuccessful({ token: value[0].token }));
            } else {
                localStorage.clear();
            }
        });
    }

    public logOut(): void {
        localStorage.removeItem(CURRENT_USER);
        this.store.dispatch(userLogout());
    }
}
