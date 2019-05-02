import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Array<RaceModel> = [];
  constructor() { }

  list() {
    return [{ name: 'Lyon' }, { name: 'London' }];
  }
}
