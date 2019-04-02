import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	//selectedHero: Hero;
	heroes: Hero[];

	constructor( private heroSrevice: HeroService) { }

	ngOnInit() {
		this.getHeroes();
	}
	// onSelect(hero: Hero): void{
	// 	this.selectedHero = hero;
	// }
	getHeroes(): void{
		this.heroSrevice.getHeroes()
		.subscribe(heroes=> this.heroes= heroes);
	}
	add(name: string) : void{
		name= name.trim();
		if(!name){return ;}
		this.heroSrevice.addHero({name} as Hero)
		.subscribe(hero=>{
			this.heroes.push(hero);	
		})
	}
	delete(hero : Hero): void{
		this.heroes= this.heroes.filter(h=>h!== hero);
		this.heroSrevice.deleteHero(hero).subscribe();
	}
	
}
