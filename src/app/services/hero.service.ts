import { Injectable } from '@angular/core';
import {  Observable, of} from 'rxjs';
import { Hero } from './hero';
import { Heroes } from '../mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'api/heroes';
  private httpOptions = {
    headers : new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url).pipe(
      tap(_ => this.log('fetched Heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {

    const url = `${this.url}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.url, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`New Hero add : ${hero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<Hero>(deleteUrl, this.httpOptions).pipe(
      tap(_ => this.log(`delete hero id : ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ? this.log(`Found heroes matching ${term}`) : this.log(`No heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  private log(message: string): void {

    this.messageService.addMessage(`HeroService: ${message}`);
  }
}
