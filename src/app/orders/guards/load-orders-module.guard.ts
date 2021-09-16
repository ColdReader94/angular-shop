import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { userLoadFailed } from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Injectable({
  providedIn: 'root',
})
export class LoadOrdersModuleGuard implements CanLoad {
  constructor(private store: Store<AppState>, private userDataSelector: UserDataSelectors,
    private router: Router, private loginService: LoginService) {}

  canLoad():
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
        if (!this.loginService.loginCheck()) {
          this.router.navigateByUrl('');
          this.store.dispatch(userLoadFailed({ errorMessage: "Пожалуйста авторизуйтесь чтобы управлять заказами и избранным" }));
          return false;
      } 
        return this.store.select(this.userDataSelector.selectLoggedState).pipe(
          filter(value => value),
          take(1)
          ); 
  }
}