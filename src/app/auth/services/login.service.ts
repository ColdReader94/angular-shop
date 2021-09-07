import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user.model';
import { userFoundSuccessful, userLogout } from 'src/app/redux/actions/user-data.actions';
import { AppState } from 'src/app/redux/state.models';

const CURRENT_USER= 'currentUser';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    public isLoggedIn$: Observable<boolean>;
    private isLogged$ = new BehaviorSubject(false);

    constructor(private store: Store<AppState>) {
        this.isLoggedIn$ = this.isLogged$.asObservable();
    }

    public setToLocalStorage(user: IUser): void {
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    }

    public loginCheck(): void {
        if (localStorage.getItem(CURRENT_USER)) {
            let localStorageToken = localStorage.getItem(CURRENT_USER);
            localStorageToken ? localStorageToken = (JSON.parse(localStorageToken) as IUser).token : '';
            this.store.dispatch(userFoundSuccessful({ token: localStorageToken as string }));
        }
        
    }

    public logOut(): void {
        localStorage.removeItem(CURRENT_USER);
        this.store.dispatch(userLogout());
    }
}


//     public loginCheck(): void {
//         if (localStorage.getItem(CURRENT_USER)) {
//             const user = JSON.parse(
//                 localStorage.getItem(CURRENT_USER) || ''
//             ) as IUser;
//             this.userExistCheck(user);
//         }
//     }

//     public logOut(): void {
//         localStorage.removeItem(CURRENT_USER);
//         this.store.dispatch(userLogout());
//     }

//     public userExistCheck(currentUser: IUser): void {
//         this.httpRequest.getUserInfo(currentUser.token).subscribe((value) => {
//             if (value) {
//                 this.store.dispatch(userFoundSuccessful({ token: currentUser.token }));
//             } else {
//                 this.store.dispatch(userRegister({ user: currentUser }));
//             }
//         });
//     }
// }
