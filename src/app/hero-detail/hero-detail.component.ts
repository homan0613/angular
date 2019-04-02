import { Component, OnInit, Input} from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';
import { HttpHandler, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero;//khai bao moi duoc su dung o html
	constructor(
		private route : ActivatedRoute,
		private heroService: HeroService,
		private location:  Location
		) {}

	ngOnInit(): void {
		this.getHero();
	}

	getHero(): void{
		const id= +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id)
		.subscribe(hero => this.hero=hero);	
	}
	goBack(): void{
		this.location.back();
	}
	save(): void{
		this.heroService.updateHero(this.hero)
		.subscribe(()=> this.goBack());
	}
	
}
