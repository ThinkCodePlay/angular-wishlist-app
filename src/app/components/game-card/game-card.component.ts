import { Component, Input, OnInit } from '@angular/core';
import { CheapsharkGame } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() game : CheapsharkGame = new CheapsharkGame();
  constructor() { }

  ngOnInit(): void {
  }

}
