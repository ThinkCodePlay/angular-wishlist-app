import { Component, Input, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/models/wishlist.model';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss']
})
export class WishlistCardComponent implements OnInit {
  @Input() game : Wishlist = new Wishlist();

  constructor() { }

  ngOnInit(): void {
  }

}
