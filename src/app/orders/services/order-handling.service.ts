import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/core/models/order.model';
import { baseUrl, ServerApiRoutes } from 'src/app/shared/server-api-routes';

@Injectable({
    providedIn: 'root',
})
export class OrderHandlingService {
    constructor(private http: HttpClient) {}

    public makeOrder(order: IOrder): Observable<string> {
        return this.http.post(
            `${baseUrl}${ServerApiRoutes.order}`,
            order
        ) as Observable<string>;
    }

    public changeOrder(order: IOrder): Observable<Response> {
        return this.http.put(
            `${baseUrl}${ServerApiRoutes.order}`,
            order
        ) as Observable<Response>;
    }

    public deleteOrder(orderId: string): Observable<Response> {
        return this.http.delete(
            `${baseUrl}${ServerApiRoutes.order}?id=${orderId}`
        ) as Observable<Response>;
    }
}
