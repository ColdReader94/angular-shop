import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { params, geolocationApiUrl } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { IGeolocationInterfaceResponse } from '../models/geolocation-api-response.model';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { baseUrl, ServerApiRoutes, getCategoryGoods } from 'src/app/shared/server-api-routes';
import { ICategories } from 'src/app/core/models/categories.model';
import { IGoodsBaseItem } from '../models/goods.model';
@Injectable({
    providedIn: 'root',
})
export class HttpRequestsService {
    constructor(private http: HttpClient) {}

    public getGeolocation(position: GeolocationPosition): Observable<string> {
        return this.http
            .get(
                `${geolocationApiUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}${params}`
            )
            .pipe(map((value) => (<IGeolocationInterfaceResponse>value).address.city));
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

    public getCategoryGoods(
        categoryId: string,
        start: number,
        itemsPerPage: number
    ): Observable<IGoodsBaseItem[]> {
        return this.http.get(
            `${baseUrl}${getCategoryGoods}${categoryId}?start=${start}&count=${itemsPerPage}`.replace(/\u200B/g, '')
        ) as Observable<IGoodsBaseItem[]>;
    }

    public getSubCategoryGoods(
        categoryId: string,
        subCategoryId: string,
        start: number,
        itemsPerPage: number
    ): Observable<IGoodsBaseItem[]> {
        return this.http.get(
            `${baseUrl}${getCategoryGoods}${categoryId}/${subCategoryId}?start=${start}&count=${itemsPerPage}`.replace(/\u200B/g, '')
        ) as Observable<IGoodsBaseItem[]>;
    }
}
