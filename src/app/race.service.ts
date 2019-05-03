import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  baseUrl: string = 'http://ponyracer.ninja-squad.com';
  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${this.baseUrl}/api/races?status=PENDING`);
  }
}