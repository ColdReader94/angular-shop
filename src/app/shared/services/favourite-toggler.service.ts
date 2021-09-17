import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { baseUrl, ServerApiRoutes } from '../server-api-routes';

@Injectable({
  providedIn: 'root',
})
export class FavouriteTogglerService {

  constructor(private http: HttpClient) {}

  public addToFavourite(text: string): Observable<unknown> {
    return this.http.post(
        `${baseUrl}${ServerApiRoutes.favourite}`,
        { id: text }
    ) as Observable<unknown>;
}

public deleteFavourite(id: string): Observable<unknown> {
  return this.http.delete(
      `${baseUrl}${ServerApiRoutes.favourite}?=${id}`
  ) as Observable<unknown>;
}
}
