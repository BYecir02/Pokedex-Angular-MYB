import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Pokemon,
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
} from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonListResponse>(`${this.url}?limit=20`)
      .pipe(map((response) => response.results.map((pokemon) => this.createPokemon(pokemon))));
  }

  getPokemon(id: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.url}/${id}`);
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
