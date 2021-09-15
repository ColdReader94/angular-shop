import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIpLocationInterfaceResponse } from '../models/geolocation-api-response.model';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import {
    baseUrl,
    ServerApiRoutes,
    getCategoryGoods,
} from 'src/app/shared/server-api-routes';
import { ICategories } from 'src/app/core/models/categories.model';
import { IGoodsBaseItem } from '../models/goods.model';
import { locationByIp } from 'src/app/shared/constants';
@Injectable({
    providedIn: 'root',
})
export class HttpRequestsService {
    constructor(private http: HttpClient) {}

    public getLocationByIp(): Observable<IIpLocationInterfaceResponse> {
        return this.http
            .get(
                locationByIp
            )
            .pipe(map(value =>
               value as IIpLocationInterfaceResponse
            ));
    }

    public findUser(login: string, password: string): Observable<Pick<IUser, 'token'>> {
        return this.http.post(`${baseUrl}${ServerApiRoutes.userFind}`, {
            login,
            password,
        }) as Observable<Pick<IUser, 'token'>>;
    }

    public getUserInfo(token: string): Observable<IUser[]> {
        const headersCreate = {
            'Content-Type': 'application/json',
            Authorization: `Bearer${token}`,
        };
        return this.http.get(`${baseUrl}${ServerApiRoutes.userGetInfo}`, {
            headers: headersCreate,
        }) as Observable<IUser[]>;
    }

    public registerUser(newUser: IUser): Observable<Pick<IUser, 'token'>> {
        return this.http.post(
            `${baseUrl}${ServerApiRoutes.userRegister}`,
            newUser
        ) as Observable<Pick<IUser, 'token'>>;
    }

    public getCategories(): Observable<ICategories[]> {
        return this.http.get(`${baseUrl}${ServerApiRoutes.getCategories}`) as Observable<
            ICategories[]
        >;
    }

    public searchGoods(text: string): Observable<IGoodsBaseItem[]> {
        return this.http.get(
            `${baseUrl}${ServerApiRoutes.searchGoods}${text}`
        ) as Observable<IGoodsBaseItem[]>;
    }

    public getGoods(text: string): Observable<IGoodsBaseItem> {
        return this.http.get(
            `${baseUrl}${ServerApiRoutes.getGoods}${text}`
        ) as Observable<IGoodsBaseItem>;
    }

    public getCategoryGoods(
        categoryId: string,
        start: number | string = 'start',
        itemsPerPage: number | string = 'itemsPerPage'
    ): Observable<IGoodsBaseItem[]> {
        return this.http.get(
            `${baseUrl}${getCategoryGoods}${categoryId}?start=${start}&count=${
                itemsPerPage || 'itemsPerPage'
            }`.replace(/\u200B/g, '')
        ) as Observable<IGoodsBaseItem[]>;
    }

    public getSubCategoryGoods(
        categoryId: string,
        subCategoryId: string,
        start: number | string = 'start',
        itemsPerPage: number | string = 'itemsPerPage'
    ): Observable<IGoodsBaseItem[]> {
        return this.http.get(
            `${baseUrl}${getCategoryGoods}${categoryId}/${subCategoryId}?start=${start}&count=${
                itemsPerPage}`.replace(
                /\u200B/g,
                ''
            )
        ) as Observable<IGoodsBaseItem[]>;
    }
}
