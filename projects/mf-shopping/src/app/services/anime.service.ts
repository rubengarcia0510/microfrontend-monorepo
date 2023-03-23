import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProductCard } from '../models/product-card.interface';
import { IResponseAnime } from '../models/anime-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private _httpClient: HttpClient) {}

  private _getNumberRandom() {
    return Math.floor(Math.random() * (500 - 1 + 1) + 1);
  }

  getAnimes(): Observable<IProductCard[]> {
    return this._httpClient
      .get<IResponseAnime>('https://api.jikan.moe/v4/anime?q=kimetsu&sfw')
      .pipe(
        map((response) => {
          return response.data
            .filter((item) => item.synopsis)
            .map<IProductCard>((item) => ({
              urlImage: item.images.jpg.image_url,
              price: this._getNumberRandom(),
              name: item.title,
              description: item.synopsis!,
            }));
        })
      );
  }
}
