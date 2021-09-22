import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { TokenAddInterceptor } from './token-add.interceptor';

export const INTERCEPTOR_PROVIDERS: Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenAddInterceptor,
        multi: true,
    },
];
