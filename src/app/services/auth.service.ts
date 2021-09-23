import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = `${environment.SERVER_URI}/user`;
  loginUrl = `${environment.SERVER_URI}/user/login`;
  logoutUrl = `${environment.SERVER_URI}/user/logout`;

  userConnected = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    let auth = new Auth(email, password);
    return this.http
      .post<Auth>(this.loginUrl, auth, { withCredentials: true })
      .subscribe(
        (user) => {
          console.log(user);
          this.handelAuthentication(true);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  register(email: string, password: string, name: string) {
    let auth = new Auth(email, password, name);
    return this.http.post<Auth>(this.registerUrl, auth, {
      withCredentials: true,
    });
  }

  logout() {
    this.http
      .post(this.logoutUrl, null, { withCredentials: true })
      .subscribe(() => {
        console.log('secces log out');
        this.handelAuthentication(false);
      });
  }

  // broadcast if the user is connected
  private handelAuthentication(isConnected: boolean) {
    {
      if (isConnected) {
        localStorage.setItem('user', 'true');
        this.router.navigate(['/wishlist']);
      } else {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

      this.userConnected.next(isConnected);
    }
  }

  // this isn't a real login, since that is all handeld via cookies.
  // this is just a fallback incase a refresh happens we store the state in local storage
  autoLogin() {
    
    const userData = localStorage.getItem('user');
    console.log('autoLogin', userData);

    if (!userData) {
      return this.userConnected.next(false);
    }

    this.userConnected.next(true);
  }
}
