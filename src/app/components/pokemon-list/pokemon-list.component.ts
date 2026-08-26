import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, Subscription } from 'rxjs';
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
  private searchInput$ = new Subject<string>();
  private subscriptions = new Subscription();

  pokemons = signal<Pokemon[]>([]);
  filteredPokemons = signal<Pokemon[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.subscriptions.add(
      this.pokemonApiService.getPokemons().subscribe({
        next: (pokemons) => {
          this.pokemons.set(pokemons);
          this.filteredPokemons.set(pokemons);
          this.loading.set(false);
        },
        error: (error: unknown) => {
          console.error(error);
          this.errorMessage.set('Impossible de charger les Pokémon.');
          this.loading.set(false);
        },
      }),
    );

    this.subscriptions.add(
      this.searchInput$
        .pipe(
          debounceTime(300),
          map((term) => term.trim().toLowerCase()),
          distinctUntilChanged(),
          map((term) =>
            this.pokemons().filter((pokemon) => pokemon.name.toLowerCase().includes(term)),
          ),
        )
        .subscribe((pokemons) => this.filteredPokemons.set(pokemons)),
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;

    this.searchInput$.next(input.value);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
