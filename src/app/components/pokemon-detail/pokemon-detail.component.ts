import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonDetail } from '../../models/pokemon.model';
import { PokemonApiService } from '../../services/pokemon-api.service';

@Component({
  imports: [RouterLink],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.component.css',
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private pokemonApiService = inject(PokemonApiService);
  private subscription?: Subscription;

  pokemon = signal<PokemonDetail | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');

    if (!pokemonId) {
      this.errorMessage.set('Identifiant du Pokémon introuvable.');
      this.loading.set(false);
      return;
    }

    this.subscription = this.pokemonApiService.getPokemon(pokemonId).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error(error);
        this.errorMessage.set('Impossible de charger ce Pokémon.');
        this.loading.set(false);
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  formatId(id: number): string {
    return id.toString().padStart(3, '0');
  }
}
