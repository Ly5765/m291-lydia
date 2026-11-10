# Les quatre états de Phare

Remplissez une ligne par test, avec ce que vous **voyez**, pas ce que vous attendiez. Recopiez les messages de la console tels quels, même en anglais.

| Test | Ce que montre la page | Ce que dit la console | Onglet Réseau : fichier et code |
| --- | --- | --- | --- |
| 1. `data.json`, réseau lent (3G) | « Chargement des lieux… » pendant l'attente, puis les 30 cartes apparaissent et le message disparaît | Rien | `data.json` : 200 |
| 2. `data-absent.json`, sans `.catch` | « Chargement des lieux… » reste affiché, aucune carte | `GET http://127.0.0.1:5500/data-absent.json 404 (Not Found)` puis `Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` | `data-absent.json` : 404 |
| 3. `data-absent.json`, avec `.catch` | « Impossible de charger les lieux. Rechargez la page dans un moment. » | `GET http://127.0.0.1:5500/data-absent.json 404 (Not Found)` puis `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON (at VM97:1:1)` | `data-absent.json` : 404 |
| 4. `data-absent.json`, avec le contrôle `reponse.ok` | « Impossible de charger les lieux. Rechargez la page dans un moment. » | `GET http://127.0.0.1:5500/data-absent.json 404 (Not Found)` puis `Error: Fichier introuvable : code 404 at app.js:51:7` | `data-absent.json` : 404 |
| 5. `casse.json` | « Impossible de charger les lieux. Rechargez la page dans un moment. » | `SyntaxError: Expected double-quoted property name in JSON at position 673 (line 28 column 3)` | `casse.json` : 304 (cache actif) |
| 6. `vide.json`, avant le contrôle de la liste vide | Seulement le titre et la phrase d'accroche, sans message ni carte | Rien | `vide.json` : 304 (cache actif) |

## Deux questions

1. Dans quel test l'onglet Réseau dit-il `200` alors que la page échoue ? Pourquoi ?

   Réponse : Au test 5, avec casse.json. Le fichier existe, donc le code est un succès (200, ou 304 avec le cache), mais il est cassé : il y a une virgule en trop, alors la page ne peut pas le lire.

2. Au test 2, que devient le message « Chargement des lieux… » ? Qu'est-ce que la personne qui attend en conclut ?

   Réponse : Le message « Chargement des lieux… » reste affiché pour toujours, alors que le chargement a échoué. La personne croit que ça charge encore et attend pour rien, puis finit par penser que c'est en panne, sans savoir quoi faire.
