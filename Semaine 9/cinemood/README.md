# CineMood — choix de mise en page

- **CSS Grid** organise les cartes de films sur deux axes : une colonne sur mobile, deux colonnes dès 768 px et trois colonnes sur grand écran.
- **Flexbox** aligne les éléments à l’intérieur d’une carte, de l’en-tête, des filtres et de la navigation, où un seul axe suffit.
- Les couleurs sont centralisées dans `:root` selon une répartition visuelle 60-30-10 : fond bordeaux, surfaces rouge framboise, accents rose vif et texte rose très clair pour le contraste. La palette évite le noir et l’orange.
- Les espacements suivent une unité de 8 px; la grille passe en plusieurs colonnes à partir de 768 px. Le HTML utilise `header`, `nav`, `main`, `article`, `aside` et `footer`.
- Le projet utilise HTML, CSS et JavaScript natifs, sans framework ni préprocesseur.

## Recherche et formulaire

- La recherche filtre les films à chaque lettre tapée, dans le titre, le mood et l’année. Un message s’affiche quand aucun film ne correspond.
- Le formulaire « Proposer un film » vérifie deux règles : un titre d’au moins 2 caractères et une année entre 1895 et 2026. Les erreurs s’affichent dans la zone `#erreurs`, sans `alert`.
- Les fiches ajoutées par le formulaire restent affichées jusqu'au rechargement de la page : il n'y a pas de serveur pour les enregistrer.
