import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${environment.baseURL}/api/races`, { params });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseURL}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseURL}/api/races/${raceId}/bets`, { ponyId });
  }

}