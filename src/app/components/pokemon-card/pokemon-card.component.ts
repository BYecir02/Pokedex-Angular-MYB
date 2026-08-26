import { Component, input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  imports: [],
  selector: 'app-pokemon-card',
  styleUrl: './pokemon-card.component.css',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();

  formatId(id: number): string {
    return id.toString().padStart(3, '0');
  }
}
