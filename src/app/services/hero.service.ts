import { Injectable } from '@angular/core';
import {  Observable, of} from 'rxjs';
import { Hero } from './hero';
import { Heroes } from '../mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.addMessage('HeroService: fetched Heroes');
    return of(Heroes);
  }

  getHero(id: number): Observable<Hero> {

    this.messageService.addMessage(`HeroService: fetched Hero id : ${id}`);
    return of(Heroes.find(hero => hero.id === id));
  }
}
