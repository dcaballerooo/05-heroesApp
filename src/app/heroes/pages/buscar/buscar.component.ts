import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];
  selectedHero: Heroe | undefined;

  constructor( private heroesService: HeroesService){ }

  buscando(){

      this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {

    if(!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

     const heroe : Heroe = event.option.value;
     this.termino = heroe.superhero;

     this.heroesService.getHeroePorId( heroe.id! )
      .subscribe(heroe => this.selectedHero = heroe);
     
  }


}
