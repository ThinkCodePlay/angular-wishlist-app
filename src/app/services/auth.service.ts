import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isConnected: boolean = false;

  registerUrl = `${environment.SERVER_URI}/user`;
  loginUrl = `${environment.SERVER_URI}/user/login`;
  logoutUrl = `${environment.SERVER_URI}/user/logout`;

  userConnected = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    let auth = new Auth(email, password);
    return this.http
      .post<LoginResponse>(this.loginUrl, auth, { withCredentials: true })
      .subscribe(
        (data) => {
          console.log('data', data);
          this.handelAuthentication(data.token);
        },
        (err) => {
          console.log('err', err);
        }
      );
  }

  register(email: string, password: string, name: string) {
    let auth = new Auth(email, password, name);
    return this.http.post<LoginResponse>(this.registerUrl, auth, {
      withCredentials: true,
    });
  }

  logout() {
    this.http
      .post(this.logoutUrl, null, { withCredentials: true })
      .subscribe(() => {
        this.userConnected.next(false);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
  }

  // broadcast if the user is connected
  private handelAuthentication(token: string) {
    {
      localStorage.setItem('token', token);
      this.isConnected = true;
      this.router.navigate(['/wishlist']);
      this.userConnected.next(true);
    }
  }

  // this isn't a real login, since that is all handeld via cookies.
  // this is just a fallback incase a refresh happens we store the state in local storage
  autoLogin() {
    // if (!userData) {
    //   return this.userConnected.next(false);
    // }
    // this.userConnected.next(true);
  }
}
