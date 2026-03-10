---
sidebar_position: 2
---

# Architecture Backend - Koudmain API

Ce projet est une API centralisée développée avec **NestJS**.
Elle a pour but de desservir simultanément les trois applications du projet Koudmain :

* L'application Web (Back-office / Dashboard)
* L'application Mobile Client
* L'application Mobile Entreprise (Pro)

L'architecture choisie est un **Monolithe Modulaire ("Feature-based")**. Toutes les applications consomment le même backend, mais le code est strictement organisé par domaine métier (User, Offer, etc.).



## 📂 Structure du projet

Voici l'organisation du dossier `src/` :

```text
src/
├── core/                          # Configurations globales (Guards, Interceptors, Filters...)
├── shared/                        # Modules techniques transversaux (Prisma/DB, Mailer, AWS S3...)
├── modules/                       # Le cœur de l'application (Dossiers classés par "Feature")
│   ├── users/
│   │   ├── services/              # Logique métier et accès base de données
|   |   ├── users.controller.ts    # Points d'entrée HTTP (Routes)
│   │   └── users.module.ts
│   │
│   └── offers/
│       ├── services/
|       ├── offers.controller.ts
│       └── offers.module.ts
│
├── app.module.ts                  # Chef d'orchestre global qui importe tous les modules métier
└── main.ts                        # Point d'entrée de l'application (Instanciation NestJS + Express)
```

## 🧩 Les 3 composants fondamentaux

Dans ce projet, nous respectons strictement le modèle d'architecture de NestJS, basé sur 3 couches. **Chaque couche a une responsabilité unique et stricte.**

### 1. Les Modules (`*.module.ts`)

Les Modules sont des boîtes hermétiques qui regroupent les éléments liés à un domaine métier précis (ex: UsersModule).

* **Leur rôle :** Déclarer les Controllers et injecter les Services (Providers).
* **Règle d'or :** Si le domaine "Offers" a besoin de la logique de "Users", le OffersModule doit importer le UsersModule.

### 2. Les Controllers (`*.controller.ts`)

Le Controller s'occupe **uniquement** de la couche HTTP.

* **Leur rôle :** Définir les routes (URL), vérifier les requêtes entrantes (Headers, Body, Paramètres), et appeler le Service approprié.
* **Règle d'or :** Les Controllers ne doivent contenir **AUCUNE logique métier** ni **AUCUNE requête en base de données**. Ils font simplement le lien entre le réseau et nos algorithmes.



> 💡 **Gestion Multi-Applications** :
> Par défaut, nous utilisons un Controller générique par domaine (ex: `@Controller('offers')`).
> Si plus tard la logique de routage diverge fortement entre le web et le mobile, nous pourrons créer des Controllers spécifiques dans le même module (ex: `offers-web.controller.ts` via `@Controller('offers/web')`).


### 3. Les Services (`*.service.ts`)

Le Service continent toute la "matière grise" de l'application.

* **Leur rôle :** Exécuter les algorithmes, faire les calculs métiers, et interagir avec la base de données.
* **Règle d'or :** Un Service ne doit avoir aucune connexion avec Express ou le réseau (pas d'objet HTTP `Request` ou `Response` ici).


> 💡 **Séparer la logique des Services** :
> Si un domaine devient très complexe (ex: Offers), nous découpons le Service principal en plusieurs "Sous-Services" (ex: `offers-crud.service.ts`, `offers-search.service.ts`). Le Controller s'occupera d'appeler le service dont il a besoin.



## 🛠 Comment ajouter une nouvelle fonctionnalité ?

Imaginons que vous deviez créer la gestion des **Paiements**. Voici la marche à suivre pas à pas :

### Étape 1 : Créer le Module

Générer le module de base via le CLI NestJS (qui mettra automatiquement à jour `app.module.ts`) :

```bash
nest g module modules/payments
```

### Étape 2 : Créer le(s) Service(s)

Générer le service qui contiendra la logique :

```bash
nest g service modules/payments/services/payments --flat
```

*Note : Le flag* `*--flat*` *évite la création d'un sous-dossier inutile.*

### Étape 3 : Créer le(s) Controller(s)

Générer le contrôleur qui exposera la route API :

```bash
nest g controller modules/payments/controllers/payments --flat
```

### Étape 4 : Développer !


1. Vous écrivez votre logique de traitement dans `payments.service.ts`.
2. Vous créez vos routes (ex: `@Post('checkout')`) dans `payments.controller.ts`.
3. Le controller injecte le service dans son `constructor()` pour récupérer le résultat.



## 🚫 Pièges à éviter

* **Le God Service :** Ne mettez pas 2000 lignes dans un seul service.ts. Séparez la logique de création (`create()`), de la logique de calcul complexe ou d'envois de notifications.
* **Dépendances circulaires :** Si le UsersModule importe OffersModule, et que OffersModule importe UsersModule, NestJS crashera (erreur d'indétermination). Utilisez alors l'outil de NestJS réseau `forwardRef()`, ou mieux : repensez l'architecture pour qu'un Module technique ("Shared") fournisse la logique commune aux deux !


> 💡 Utiliser cette documentation pour approfondir le fonctionnement de NestJS : <https://docs.nestjs.com/>
