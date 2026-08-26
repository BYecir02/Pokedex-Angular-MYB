# Pokedex Angular

## Auteur

**Badirou Mohamed Yecir**

## Description du projet

Cette application Angular affiche une liste de Pokémon récupérée depuis l'API publique [PokeAPI](https://pokeapi.co/).

L'utilisateur peut consulter les 20 premiers Pokémon, rechercher un Pokémon par son nom et ouvrir une page de détail contenant son image, ses types et ses statistiques de base.

## Fonctionnalités

- Récupération des 20 premiers Pokémon depuis PokeAPI
- Affichage des Pokémon sous forme de cartes réutilisables
- Affichage du numéro, du nom et de l'image de chaque Pokémon
- Recherche en direct par nom avec RxJS
- Message de chargement pendant les appels HTTP
- Gestion des erreurs de l'API
- Navigation vers une page de détail avec Angular Router
- Affichage des types et des statistiques de base
- Représentation des statistiques avec des barres CSS
- Interface responsive adaptée aux ordinateurs et aux téléphones

## Technologies utilisées

- Angular 22
- TypeScript
- HTML
- CSS
- RxJS
- Angular Router
- Angular HttpClient
- PokeAPI

## Prérequis

Avant de lancer le projet, il faut installer :

- Node.js compatible avec Angular 22
- npm
- Angular CLI 22

## Installation

Ouvrir un terminal à la racine du projet, puis installer les dépendances :

```bash
npm install
```

## Lancement de l'application

Lancer le serveur de développement :

```bash
ng serve
```

Il est également possible d'utiliser la commande suivante :

```bash
npm start
```

Ouvrir ensuite l'adresse suivante dans un navigateur :

```text
http://localhost:4200/
```

L'application se recharge automatiquement après chaque modification du code source.

## Compilation

Pour compiler le projet en mode production :

```bash
npm run build
```

Les fichiers compilés sont générés dans le dossier `dist/`.

## Tests

Pour exécuter les tests unitaires :

```bash
npm test
```

## Organisation du projet

```text
src/
└── app/
    ├── components/
    │   ├── pokemon-card/
    │   ├── pokemon-detail/
    │   └── pokemon-list/
    ├── models/
    │   └── pokemon.model.ts
    ├── services/
    │   └── pokemon-api.service.ts
    ├── app.component.ts
    └── app.routes.ts
```

- `components/` contient les composants responsables de l'affichage.
- `models/` contient les interfaces TypeScript utilisées pour typer les données.
- `services/` contient la logique des appels HTTP vers PokeAPI.
- `app.routes.ts` contient la configuration des routes de l'application.

## API utilisée

Liste des Pokémon :

```text
https://pokeapi.co/api/v2/pokemon?limit=20
```

Détail d'un Pokémon :

```text
https://pokeapi.co/api/v2/pokemon/{id}
```

Documentation de PokeAPI :

```text
https://pokeapi.co/docs/v2
```

## Choix techniques

Le projet utilise des composants standalone, conformément à la syntaxe Angular récente présentée dans le support de cours.

Les appels HTTP sont regroupés dans `PokemonApiService`. Les composants n'utilisent donc pas directement `HttpClient`.

Les données de PokeAPI sont décrites avec des interfaces TypeScript. Aucun type `any` n'est utilisé.

Les états asynchrones, comme le chargement, les erreurs et les listes de Pokémon, sont stockés dans des signals. Ils sont mis à jour avec la méthode `.set()` afin de fonctionner correctement en mode zoneless.

La recherche utilise un `Subject`, `debounceTime(300)` et `distinctUntilChanged()`. Le filtrage est effectué localement sur les 20 Pokémon déjà chargés afin d'éviter de nouveaux appels HTTP pendant la saisie.

Chaque carte reçoit ses données depuis son composant parent avec `input.required<Pokemon>()`.

La page de détail utilise Angular Router et `ActivatedRoute` pour récupérer l'identifiant présent dans l'URL.

## Difficultés rencontrées

La réponse de l'API utilisée pour la liste ne contient pas directement les images. L'identifiant de chaque Pokémon est donc extrait de son URL, puis utilisé pour construire l'adresse de son sprite. Cette solution permet d'afficher toutes les images sans effectuer 20 appels supplémentaires.

Le projet fonctionne en mode zoneless. Les valeurs modifiées après les appels HTTP ont donc été déclarées avec `signal()` pour garantir la mise à jour de l'interface.

La recherche devait rester fluide sans envoyer une requête à chaque caractère. Un flux RxJS avec un délai de 300 millisecondes a été utilisé avant le filtrage de la liste locale.
