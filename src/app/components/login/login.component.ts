import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription = new Subscription();
  isAuthenticated: boolean = false;

  loginMode: boolean = true;
  error: string = '';

  loginForm = new FormGroup({
    email: new FormControl('John3@thinkcodeplay.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userConnected.subscribe((user) => {
      this.isAuthenticated = user;
    });
  }

  onSubmit(): void {
    this.error = '';

    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  onLoginMode(): void {
    this.loginMode = !this.loginMode;
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
