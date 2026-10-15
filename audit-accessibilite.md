# Mon audit d’accessibilité — CineMood

## Contrastes

J’ai vérifié les contrastes des textes et des boutons dans mon CSS. Le minimum demandé pour le texte courant est de **4,5:1**. Les contrastes que j’ai vérifiés sont conformes :

| Élément | Contraste |
|---|---:|
| Texte clair sur le fond bleu nuit | 18,35:1 |
| Logo bleu sur le fond | 4,92:1 |
| Texte indicatif de la recherche | 8,39:1 |
| Texte des moods | de 9,14:1 à 12,97:1 |
| Mood sélectionné et bouton principal | 7,54:1 |
| Badge de mood | 9,15:1 |
| Navigation inactive | 9,93:1 |
| Navigation active | 5,36:1 |

Le ratio le plus bas est celui du logo : **4,92:1**. Il dépasse le minimum demandé.

## Test au clavier

J’ai testé la touche **Tab** dans Safari et j’ai vu le contour de focus. Je dois encore refaire ce test sur les écrans 2 et 3 pour vérifier que le contour reste visible partout. Les boutons peuvent être activés avec Entrée ou Espace.

## Taille des boutons

La plupart des boutons font au moins **48 px** de haut. Les filtres de mood font **44 px**. Ils dépassent le minimum demandé de 24 px, mais je pourrais les agrandir à 48 px pour qu’ils soient plus faciles à toucher.

## Test utilisateur

J’ai fait le test utilisateur. Le participant a eu deux hésitations :

1. Il ne comprenait pas tout de suite le choix du mood.
2. Après le filtre, il ne savait pas facilement quel film choisir.

J’ai noté ces observations dans ma fiche. Pour le rapport, je dois aussi préciser la durée du test si elle a été chronométrée.

## Corrections

1. J’ai assombri le fond du mood sélectionné en `#0649c7`. Le contraste du texte blanc est passé de **3,99:1** à **7,54:1**.

2. J’ai assombri une partie du fond de `#10243a` à `#0b1b2b`. Le contraste du logo bleu est passé de **4,44:1** à **4,92:1**.

## Bilan

Les contrastes que j’ai vérifiés respectent le minimum WCAG AA. Le test au clavier a fonctionné sur l’écran affiché. Il me reste à vérifier le focus sur les écrans 2 et 3 et à préciser la durée du test utilisateur si je l’ai notée.