import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Pokemon,
  PokemonListItem,
  PokemonListResponse,
} from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(this.url).pipe(
      map((response) =>
        response.results.map((pokemon) => this.createPokemon(pokemon)),
      ),
    );
  }

  private createPokemon(pokemon: PokemonListItem): Pokemon {
    const id = this.getPokemonId(pokemon.url);

    return {
      id,
      name: pokemon.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }

  private getPokemonId(url: string): number {
    const segments = url.split('/').filter((segment) => segment);

    return Number(segments[segments.length - 1]);
  }
}
