import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, ServerApiRoutes } from '../server-api-routes';

@Injectable({
  providedIn: 'root',
})
export class FavouriteTogglerService {

  constructor(private http: HttpClient) {}

  public addToFavourite(text: string): Observable<Response> {
    return this.http.post(
        `${baseUrl}${ServerApiRoutes.favourite}`,
        { id: text }
    ) as Observable<Response>;
}

public deleteFavourite(id: string): Observable<Response> {
  return this.http.delete(
      `${baseUrl}${ServerApiRoutes.favourite}?id=${id}`
  ) as Observable<Response>;
}
}
