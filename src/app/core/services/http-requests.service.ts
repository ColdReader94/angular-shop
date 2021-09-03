import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { params, geolocationApiUrl } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { IGeolocationInterfaceResponse } from '../models/geolocation-api-response.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {

  constructor(
    private http: HttpClient
) {}

  public getGeolocation(position: GeolocationPosition): Observable<string> {
    return this.http.get(`${geolocationApiUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}${params}`).pipe(
      map((value) => (<IGeolocationInterfaceResponse>value).address.city)
    );
  }
}
