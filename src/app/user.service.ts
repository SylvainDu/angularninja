import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserModel } from './models/user.model';
import { environment } from 'src/environments/environment.prod';
import { JwtInterceptorService } from './jwt-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEventSubs : Subscription;
  userEvents = new BehaviorSubject<UserModel>(undefined);
  user: UserModel;

  constructor(private http: HttpClient, private jwtInterceptorService: JwtInterceptorService) {
    this.retrievedUser();
  }

  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.jwtInterceptorService.setJwtToken(user.token);
    this.userEvents.next(user);
  }

  retrievedUser() {
    const userConnect = window.localStorage.getItem('rememberMe');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.jwtInterceptorService.setJwtToken(user.token)
      this.userEvents.next(user);
    }
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${environment.baseURL}api/users`, body);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.baseURL}api/users/authentication`, credentials).pipe(
      tap((user: UserModel) => {
        this.storeLoggedInUser(user);
      })
    );
  }

  logout() {
    window.localStorage.removeItem('rememberMe');
    this.jwtInterceptorService.removeJwtToken();
    this.userEvents.next(null);
  }

}