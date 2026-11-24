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


## Micro-interactions

- Les boutons (moods, filtres, cartes de films, navigation, « Proposer ») changent de couleur en douceur et montrent un halo rose au survol. Ils disent : « ceci se clique, je vous ai entendu ».
- Les cartes de films apparaissent en fondu, au chargement et à chaque recherche ou filtre. Elles disent : « la liste a changé ».
- Le message d'erreur du formulaire « Proposer un film » apparaît en fondu dans `#erreurs`. Il dit : « regardez ici, il y a quelque chose à corriger ».
- Les trois mouvements sont coupés avec `@media (prefers-reduced-motion: reduce)` : les changements ont toujours lieu, mais d'un coup.

## Crédits des images

Les vraies affiches de ces films sont protégées : ces 20 films utilisent à la place une photo d'ambiance libre de droits (licence Unsplash), chargée depuis images.unsplash.com.

- Get Out : photo de Miska Sage sur Unsplash
- The Truman Show : photo de Viktor Mogilat sur Unsplash
- Paddington : photo de Matt Walsh sur Unsplash
- Very Bad Trip : photo de Julian Paefgen sur Unsplash
- La La Land : photo de Martin Adams sur Unsplash
- Seven : photo de Filip Mroz sur Unsplash
- Conjuring : photo de m wrona sur Unsplash
- Forrest Gump : photo de Evie S. sur Unsplash
- Le Dîner de cons : photo de Wesley Tingey sur Unsplash
- Titanic : photo de Alonso Reyes sur Unsplash
- Prisoners : photo de Suhyeon Choi sur Unsplash
- Ça : photo de Denisse Leon sur Unsplash
- Coco : photo de Filza H sur Unsplash
- Le Loup de Wall Street : photo de Viktorija Demjanenko sur Unsplash
- Nos étoiles contraires : photo de Olena Bohovyk sur Unsplash
- Memento : photo de Nik sur Unsplash
- A Quiet Place : photo de Jesse Gardner sur Unsplash
- Le Roi Lion : photo de Andreas Vonlanthen sur Unsplash
- Astérix et Obélix : Mission Cléopâtre : photo de Alex Azabache sur Unsplash
- Before Sunrise : photo de Viktor Vilyus sur Unsplash
