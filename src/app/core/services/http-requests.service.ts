import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { params, geolocationApiUrl } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { IGeolocationInterfaceResponse } from '../models/geolocation-api-response.model';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { baseUrl, ServerApiRoutes } from 'src/app/shared/serverApiRoutes';
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

    public findUser(login: string, password: string): Observable<{ token: string }> {
        return this.http.post(`${baseUrl}${ServerApiRoutes.userFind}`, {
            login,
            password,
        }) as Observable<{ token: string }>;
        
    }

    public getUserInfo(token: string): Observable<IUser[]> {
        return this.http.get(
            `${baseUrl}${ServerApiRoutes.userGetInfo}${token}`
        ) as Observable<IUser[]>;
    }

    public registerUser(newUser: IUser): Observable<unknown> {
        return this.http.post(`${baseUrl}${ServerApiRoutes.userRegister}`, newUser);
    }
}
