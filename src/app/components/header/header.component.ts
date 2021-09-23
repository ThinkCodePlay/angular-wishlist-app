import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription = new Subscription;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userConnected.subscribe((user) => {
      this.isAuthenticated = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
