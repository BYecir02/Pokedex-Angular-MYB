import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  imports: [PokemonCardComponent],
  selector: 'app-pokemon-list',
  styleUrl: './pokemon-list.component.css',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private pokemonApiService = inject(PokemonApiService);
  private subscription!: Subscription;

  pokemons = signal<Pokemon[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.subscription = this.pokemonApiService.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error(error);
        this.errorMessage.set('Impossible de charger les Pokémon.');
        this.loading.set(false);
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
