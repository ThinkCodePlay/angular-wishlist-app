import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchGamesComponent } from './components/search-games/search-games.component';

const routes: Routes = [
  { path: "login", component:  LoginComponent},
  { path: "search", component:  SearchGamesComponent},
  { path: "wishlist", component:  WishlistComponent},
  { path: "", redirectTo: "search", pathMatch: "full" }, // Default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
