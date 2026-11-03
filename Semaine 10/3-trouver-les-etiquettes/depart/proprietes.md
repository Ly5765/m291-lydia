# Les étiquettes de la location d'instruments

Une ligne par étiquette. La colonne « Sert à » répond aux questions 2, 3 et 4 de la méthode : afficher, filtrer, trier. Une étiquette qui ne sert à rien de tout cela n'entre pas dans le fichier, sauf `id`.

| Étiquette | Écran | Sert à (afficher, filtrer, trier) | Sorte de valeur | Unique ? | Exemple |
| --- | --- | --- | --- | --- | --- |
| id | aucun | distinguer les fiches | nombre | oui | 1 |
| nom | Liste | afficher | texte | non | "Violon 3/4" |
| famille | Liste | afficher, filtrer | texte | non | "cordes", "vents", "percussions" |
| prixMois | Liste | afficher, trier | nombre | non | 25 |
| taille | Détail | afficher | texte | non | "enfant", "adulte" |
| description | Détail | afficher | texte | non | "Avec étui et archet." |
| disponible | aucun | filtrer | vrai/faux | non | true |

Pourquoi le nom de l'instrument ne suffit pas à distinguer les fiches (une phrase) :
Les deux « Violon 3/4 » ont le même nom, la même famille, le même prix et la même taille : seul l'id permet de savoir lequel est déjà loué.

Suggestion de l'IA que j'ai refusée, et pourquoi :
