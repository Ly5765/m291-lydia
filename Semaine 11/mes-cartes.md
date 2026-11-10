# Mes cartes

Une ligne par texte écrit à la main dans **une** carte de votre `index.html` (semaine 9). Prenez les étiquettes dans `etiquettes.md` (semaine 10).

## La carte

Élément et classe de la carte entière (par exemple `article.carte`, ou `li` puis `a.carte`) : `article.film-card` puis `button.film-card-button`

## Ce qu'elle montre

| Texte écrit à la main | Étiquette de `data.json` qui le remplace | Élément et classe |
| --- | --- | --- |
| `image/inception.jpg` (l'affiche) | `affiche` | `img.poster-image`, dans `span.poster` |
| INCEPTION (titre sur l'affiche, en majuscules) | `titre` | `span.poster-label` |
| Inception | `titre` | `span.film-title` |
| 2010 | `annee` | `span.film-year` |
| ✦ Mystérieux | `mood` | `span.mood-badge` |

Les étiquettes `duree` et `description` ne sont pas sur la carte : elles s'affichent dans la fiche détaillée (`#detail-duration`, `#detail-description`).

## Les étiquettes vrai ou faux

Pour chaque étiquette qui vaut `true` ou `false` : le texte et la classe à montrer dans chaque cas.

| Étiquette | Si `true` : texte, classe | Si `false` : texte, classe |
| --- | --- | --- |
| Aucune : `data.json` n'a pas d'étiquette vrai ou faux. | | |

## Le conteneur

L'élément qui contient toutes les cartes, et l'`id` que vous lui donnez : `div.film-grid`, avec `id="liste-cartes"` (écran de recherche, tous les films). Les trois films de l'accueil vont dans `div#home-films`.

## Une carte entière (copiée pour l'étape 5)

```html
<article class="film-card">
  <button type="button" class="film-card-button" aria-label="Voir les détails de Inception">
    <span class="poster has-image" aria-hidden="true">
      <img class="poster-image" src="image/inception.jpg" alt="" loading="lazy">
      <span class="poster-label">INCEPTION</span>
    </span>
    <span class="film-title">Inception</span>
    <span class="film-year">2010</span>
    <span class="mood-badge">✦ Mystérieux</span>
  </button>
</article>
```
