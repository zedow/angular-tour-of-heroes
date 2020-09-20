import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(): object {
    const heroes: Hero[] = [
      { id: 1, name: 'Denice' },
      { id: 2, name: 'Léa' },
      { id: 3, name: 'Killian'},
      { id: 4, name: 'Alexis'},
      { id: 5, name: 'Maxime'},
      { id: 6, name: 'Chloé'},
      { id: 7, name: 'Amélie'}
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
