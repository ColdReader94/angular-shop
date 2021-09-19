import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { Store } from '@ngrx/store';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { baseUrl, ServerApiRoutes } from 'src/app/shared/server-api-routes';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenAddInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<AppState>,
        private userSelector: UserDataSelectors
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.url.includes(baseUrl)) {
            return this.store.select(this.userSelector.selectToken).pipe(
                switchMap((token) => {
                    const authReq = token
                        ? request.clone({
                              setHeaders: { Authorization: `Bearer ${token}` },

                              responseType: 'json',
                          })
                        : request;
                    if (request.url.includes(ServerApiRoutes.order)) {
                        const requestCloneForOrders = authReq.clone({
                            responseType: 'text',
                        });
                        return next.handle(requestCloneForOrders);
                    }
                    return next.handle(authReq);
                })
            );
        }
        return next.handle(request);
    }
}
