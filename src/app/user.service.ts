import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://ponyracer.ninja-squad.com';

  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<any> {
    const myData = { login: login, password: password, birthYear: birthYear};
    
    return this.http.post(`${this.baseUrl}/api/users`, myData);
  }

  authenticate(user: any): Observable<any> {
    console.log(user);
    
    return this.http.post(`${this.baseUrl}/api/users/authentication`, user)
  }
}
