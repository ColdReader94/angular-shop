import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { geolocationApiUrl } from 'src/app/shared/constants';
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

  public getGeolocation(coords: GeolocationCoordinates): Observable<string> {
    return this.http.get(`${geolocationApiUrl}/?lat=${coords.latitude}&lon=${coords.longitude}`).pipe(
      map((value) => (<IGeolocationInterfaceResponse>value).result.items.full_address_name)
    );
  }
}
