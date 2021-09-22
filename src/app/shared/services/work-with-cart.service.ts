import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, ServerApiRoutes } from '../server-api-routes';

@Injectable({
    providedIn: 'root',
})
export class workWithCartService {
    constructor(private http: HttpClient) {}

    public addToCart(text: string): Observable<Response> {
        return this.http.post(`${baseUrl}${ServerApiRoutes.cart}`, {
            id: text,
        }) as Observable<Response>;
    }

    public deleteFromCart(id: string): Observable<Response> {
        return this.http.delete(
            `${baseUrl}${ServerApiRoutes.cart}?id=${id}`
        ) as Observable<Response>;
    }
}
