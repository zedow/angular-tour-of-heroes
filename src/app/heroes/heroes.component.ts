import { Component, OnInit } from '@angular/core';
import { Heroes } from '../mock-heroes';
import { Hero } from '../services/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor() { }

  ngOnInit(): void {

    this.heroes = Heroes;
  }

  onSelect(hero: Hero): void {

    this.selectedHero = hero;
  }

}
