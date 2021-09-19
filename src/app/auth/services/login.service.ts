import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user.model';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { userFoundSuccessful, userLogout } from 'src/app/redux/actions/user-data.actions';
import { AppState } from 'src/app/redux/state.models';
import { Paths } from 'src/app/shared/paths';

const CURRENT_USER = 'currentUser';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(
        private store: Store<AppState>,
        private httpService: HttpRequestsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public setToLocalStorage(user: IUser): void {
        const userRegistrationInfo = { firstName: user.firstName, lastName: user.lastName, token: user.token };
        localStorage.setItem(CURRENT_USER, JSON.stringify(userRegistrationInfo));
    }

    public loginCheck(): boolean {
        if (localStorage.getItem(CURRENT_USER)) {
            const userJson = localStorage.getItem(CURRENT_USER) as string;
            const user = JSON.parse(userJson) as IUser;
            if (user.token) {
                this.userExistsCheck(user);
            }
            return true;
        }
            return false;
    }

    public userExistsCheck(currentUser: IUser): void {
        this.httpService.getUserInfo(currentUser.token).subscribe((value) => {
            if (value) {
                this.store.dispatch(userFoundSuccessful({ tokenValue: currentUser.token }));
            } else {
                localStorage.clear();
            }
        });
    }

    public logOut(): void {
        localStorage.removeItem(CURRENT_USER);
        this.store.dispatch(userLogout());
        if (this.route.toString().includes('users')) {
            this.router.navigate([Paths.Root]);
        }
        window.location.reload();
    }
}
