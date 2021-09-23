import { Component, OnInit } from '@angular/core';
import { CheapsharkGame } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.scss'],
})
export class SearchGamesComponent implements OnInit {
  searchResult: CheapsharkGame[] = [];

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {}

  onSearch(searchInput: HTMLInputElement) {
    const title = searchInput.value
    this.gameService.searchGames(title).subscribe(
      (data) => {
      this.searchResult = [...data];
    });
  }
}
