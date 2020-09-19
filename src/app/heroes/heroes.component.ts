import { Component, OnInit } from '@angular/core';
import { Hero } from '../services/hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.getHeroes();
  }

  getHeroes(): void {

    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {

    this.selectedHero = hero;
    this.messageService.addMessage(`Selected Hero : ${hero.name}`);
  }

}
