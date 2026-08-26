import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  imports: [RouterLink],
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
