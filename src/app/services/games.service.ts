import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CheapsharkGame } from '../models/game.model';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  gamesListURI = `${environment.SERVER_URI}/get-wishlist`;

  constructor(private http: HttpClient) { }

  getGamesList() {
    return this.http.get<Wishlist[]>(this.gamesListURI, {withCredentials: true});
  }

  searchGames(title: string) {
    return this.http.get<CheapsharkGame[]>('https://www.cheapshark.com/api/1.0/games?title=' + title);
  }

}


