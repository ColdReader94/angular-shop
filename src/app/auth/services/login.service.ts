import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';

const CURRENT_USER_LOGIN = 'current_user_login';
const CURRENT_USER_PASSWORD = 'current_user_password';
const CURRENT_USER_AVATAR = 'current_user_avatar';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    public isLoggedIn$: Observable<boolean>;
    private isLoggedIn$$ = new BehaviorSubject(false);

    constructor(private router: Router) {
        this.isLoggedIn$ = this.isLoggedIn$$.asObservable();
    }

    public logIn(user: IUser): void {
        localStorage.setItem(CURRENT_USER_LOGIN, user.login);
        localStorage.setItem(CURRENT_USER_PASSWORD, user.password);
        localStorage.setItem(CURRENT_USER_AVATAR, user.avatar);
        this.isLoggedIn$$.next(true);
    }

    public loginCheck(): void {
        if (localStorage.getItem(CURRENT_USER_LOGIN)) {
            this.isLoggedIn$$.next(false);
        } else {
            this.isLoggedIn$$.next(true);
        }
    }

    public logOut(): void {
        localStorage.removeItem(CURRENT_USER_LOGIN);
        localStorage.removeItem(CURRENT_USER_PASSWORD);
        localStorage.removeItem(CURRENT_USER_AVATAR);
        this.isLoggedIn$$.next(false);
    }
}
