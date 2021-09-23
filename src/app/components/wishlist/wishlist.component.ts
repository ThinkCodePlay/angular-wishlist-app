import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wishlist } from 'src/app/models/wishlist.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-me',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  gamesList: Wishlist[] = []

  constructor(private gs: GamesService, private router: Router) { }

  ngOnInit(): void {
    this.getLists()
  }

  getLists(): void {
    this.gs.getGamesList().subscribe(res => {
      console.log('success', res);
      this.gamesList = res;
    },
    err => {
      console.log('fail', err);
      if (err.status === 401) {
        this.router.navigate(['/login']) 
      }
    })
  }

}
