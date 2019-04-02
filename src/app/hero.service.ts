import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import {Hero} from './hero';
import {HEROES} from './smoke-hero';
import {MessageService} from './message.service'

const httpOptions={
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};
@Injectable({
  	providedIn: 'root'
})

export class HeroService {

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }
	
	private heroesUrl = 'api/heroes';

	getHeroes():Observable<Hero[]>{
		//this.messageService.add('HeroService: fetched heroes');
		//return of(HEROES);
		return this.http.get<Hero[]>(this.heroesUrl)
		.pipe(
			tap(_ => this.log('fetched heroes')),
			catchError(this.handleError<Hero[]>('getHeroes',[]))
		)
	}

	private handleError<T>(operation = 'operation', result ?: T){
		return (error : any): Observable<T>=>{
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T)
		}
	}

	getHero(id: number) : Observable<Hero>{
		//this.messageService.add(`heroService : fetched hero id=${id}`)
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(_=>this.log(` fetches Hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		)
		// return of(HEROES.find(hero => hero.id === id));
	}

	private log(messages: String){
		this.messageService.add(`heroService: ${messages}`);
	}
	updateHero(hero: Hero): Observable<any>{
		return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
			tap(_=> this.log(`update hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}
	addHero(hero: Hero):Observable<Hero>{
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
			tap((newHero: Hero) => this.log(`add hero w/ id=${newHero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		)
	}
	deleteHero(hero: Hero): Observable<Hero>{
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;
	  
		return this.http.delete<Hero>(url, httpOptions).pipe(
		  tap(_ => this.log(`deleted hero id=${id}`)),
		  catchError(this.handleError<Hero>('deleteHero'))
		)
	}
	searchHeroes(term: string): Observable<Hero[]> {
		if(!term.trim()){
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(_ => this.log(`found heroes matching "${term}"`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);	
	}
}
