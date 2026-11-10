"use strict";

// CineMood : la page qui affiche les films.
// Les 30 fiches sont dans data.json. Elles arrivent avec fetch.

// Éléments HTML
const conteneur = document.getElementById("liste-cartes");
const zoneEtat = document.getElementById("etat");

const screens = {
  home: document.querySelector("#home-screen"),
  search: document.querySelector("#search-screen"),
  detail: document.querySelector("#detail-screen")
};

const homeFilms = document.querySelector("#home-films");
const filterList = document.querySelector("#filter-list");
const searchInput = document.querySelector("#film-search");
const homeSearch = document.querySelector("#home-search");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");
const searchStatus = document.querySelector("#search-status");

const moodNames = [
  "Réconfortant",
  "Drôle",
  "Effrayant",
  "Romantique",
  "Qui fait réfléchir",
  "Mystérieux"
];

// La pile de toutes les fiches. Elle est vide tant que data.json n'est pas arrivé.
let tousLesLieux = [];
let selectedMood = "";
let currentFilm = null;
let previousScreen = "home";

// Recopie le message de zoneEtat sur l'écran de recherche.
function copierEtat() {
  searchStatus.textContent = zoneEtat.textContent;
  searchStatus.hidden = zoneEtat.textContent === "";
}

// Fabrique une carte pour une fiche.
function creerCarte(film) {
  const carte = document.createElement("article");
  carte.className = "film-card";

  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "film-card-button";
  bouton.setAttribute("aria-label", "Voir les détails de " + film.titre);

  const affiche = document.createElement("span");
  affiche.className = "poster has-image";
  affiche.setAttribute("aria-hidden", "true");

  const image = document.createElement("img");
  image.className = "poster-image";
  image.src = film.affiche;
  image.alt = "";
  image.loading = "lazy";

  image.addEventListener("error", () => {
    image.remove();
    affiche.classList.remove("has-image");
  });

  const etiquette = document.createElement("span");
  etiquette.className = "poster-label";
  etiquette.textContent = film.titre.toUpperCase();

  affiche.append(image, etiquette);

  const titre = document.createElement("span");
  titre.className = "film-title";
  titre.textContent = film.titre;

  const annee = document.createElement("span");
  annee.className = "film-year";
  annee.textContent = film.annee;

  const mood = document.createElement("span");
  mood.className = "mood-badge";
  mood.textContent = "✦ " + film.mood;

  bouton.append(affiche, titre, annee, mood);
  carte.append(bouton);

  bouton.addEventListener("click", () => {
    showDetail(film);
  });

  return carte;
}

// Montre une carte par fiche de la liste qu'on lui donne.
// Elle efface d'abord les cartes déjà affichées.
function afficherLieux(liste) {
  conteneur.textContent = "";

  for (const film of liste) {
    conteneur.append(creerCarte(film));
  }
}

// Les trois premiers films sur l'accueil
function afficherAccueil() {
  homeFilms.textContent = "";

  for (const film of tousLesLieux.slice(0, 3)) {
    homeFilms.append(creerCarte(film));
  }
}

// Créer les filtres par humeur
function renderFilters() {
  filterList.replaceChildren();

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "filter-chip";
  allButton.textContent = "Tous";
  allButton.setAttribute("aria-pressed", String(!selectedMood));

  allButton.addEventListener("click", () => {
    selectedMood = "";
    renderFilters();
    mettreAJourRecherche();
  });

  filterList.append(allButton);

  moodNames.forEach((mood) => {
    const chip = document.createElement("button");

    chip.type = "button";
    chip.className = "filter-chip";
    chip.textContent = mood;
    chip.setAttribute("aria-pressed", String(selectedMood === mood));

    chip.addEventListener("click", () => {
      selectedMood = selectedMood === mood ? "" : mood;

      renderFilters();
      mettreAJourRecherche();
    });

    filterList.append(chip);
  });
}

// Rechercher, trier, puis afficher les films avec afficherLieux
function mettreAJourRecherche() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const sort = document.querySelector("#sort-select").value;

  const filmsTrouves = tousLesLieux.filter((film) => {
    const matchesMood = !selectedMood || film.mood === selectedMood;

    const searchableText = (film.titre + " " + film.mood + " " + film.annee)
      .toLocaleLowerCase("fr");

    return matchesMood && searchableText.includes(query);
  });

  if (sort === "title") {
    filmsTrouves.sort((a, b) => a.titre.localeCompare(b.titre, "fr"));
  } else if (sort === "recent") {
    filmsTrouves.sort((a, b) => b.annee - a.annee);
  }

  afficherLieux(filmsTrouves);

  const count = filmsTrouves.length;

  resultsCount.textContent =
    count + " film" + (count > 1 ? "s" : "") + " trouvé" + (count > 1 ? "s" : "");

  emptyMessage.hidden = tousLesLieux.length === 0 || count !== 0;
}

// Changer d'écran
function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== name;
  });

  document.querySelector("#back-button").hidden = name === "home";
  document.querySelector(".bottom-nav").hidden = name === "detail";

  document.querySelector("#nav-home").classList.toggle("active", name === "home");
  document.querySelector("#nav-search").classList.toggle("active", name === "search");

  window.scrollTo(0, 0);
}

// Ouvrir la recherche
function showSearch(mood = "") {
  selectedMood = mood;
  searchInput.value = "";

  renderFilters();
  mettreAJourRecherche();
  showScreen("search");

  searchInput.focus();
}

// Ouvrir les détails d'un film
function showDetail(film) {
  previousScreen = screens.home.hidden ? "search" : "home";
  currentFilm = film;

  document.querySelector("#detail-title").textContent = film.titre;
  document.querySelector("#detail-year").textContent = film.annee;
  document.querySelector("#detail-duration").textContent = film.duree;
  document.querySelector("#detail-mood").textContent = "✦ " + film.mood;
  document.querySelector("#detail-description").textContent = film.description;

  const poster = document.querySelector("#detail-poster");
  poster.replaceChildren();

  const image = document.createElement("img");
  image.src = film.affiche;
  image.alt = "Affiche de " + film.titre;
  image.style.objectPosition = "center";

  image.addEventListener("error", () => {
    image.remove();
    poster.setAttribute("aria-label", "Affiche indisponible pour " + film.titre);
  });

  poster.setAttribute("aria-label", "Affiche de " + film.titre);
  poster.append(image);

  document.querySelector("#watch-message").textContent = "";

  showScreen("detail");
  document.querySelector("#detail-back").focus();
}

// Retour à l'accueil
function showHome() {
  showScreen("home");
  document.querySelector("#logo").focus();
}

// Retour à l'écran précédent
function goBack() {
  if (!screens.detail.hidden) {
    showScreen(previousScreen);

    if (previousScreen === "search") {
      searchInput.focus();
    } else {
      document.querySelector("#logo").focus();
    }
  } else {
    showHome();
  }
}

// Boutons des humeurs de l'accueil
document.querySelectorAll(".mood-tile").forEach((button) => {
  button.addEventListener("click", () => {
    showSearch(button.dataset.mood);
  });
});

// Recherche depuis l'accueil
homeSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = homeSearch.value;

    showSearch("");
    searchInput.value = query;
    mettreAJourRecherche();
  }
});

// Bouton de recherche en haut
document.querySelector("#search-button").addEventListener("click", () => {
  showSearch("");
});

// Voir tous les films
document.querySelector("#all-films-button").addEventListener("click", () => {
  showSearch("");
});

// Recherche instantanée
searchInput.addEventListener("input", mettreAJourRecherche);

// Tri des films
document.querySelector("#sort-select").addEventListener("change", mettreAJourRecherche);

// Navigation du bas
document.querySelector("#nav-home").addEventListener("click", showHome);

document.querySelector("#nav-search").addEventListener("click", () => {
  showSearch("");
});

document.querySelector("#nav-profile").addEventListener("click", () => {
  alert("La section Profil sera ajoutée plus tard.");
});

// Boutons de retour
document.querySelector("#back-button").addEventListener("click", goBack);
document.querySelector("#detail-back").addEventListener("click", goBack);

// Retour à l'accueil depuis les détails
document.querySelector("#home-button").addEventListener("click", showHome);

// Logo
document.querySelector("#logo").addEventListener("click", (event) => {
  event.preventDefault();
  showHome();
});

// Bouton Voir le film
document.querySelector("#watch-button").addEventListener("click", () => {
  if (currentFilm) {
    document.querySelector("#watch-message").textContent =
      "Aucun lien de diffusion n'est disponible pour " + currentFilm.titre + ".";
  }
});

// ----- Chargement de data.json (semaine 11) -----
zoneEtat.textContent = "Chargement des films…";
copierEtat();
fetch("data.json")
  .then(function (reponse) {
    if (!reponse.ok) {
      throw new Error("Fichier introuvable : code " + reponse.status);
    }
    return reponse.json();
  })
  .then(function (donnees) {
    zoneEtat.textContent = "";
    tousLesLieux = donnees;
    if (tousLesLieux.length === 0) {
      zoneEtat.textContent = "Aucun film pour le moment.";
      copierEtat();
      return;
    }
    copierEtat();
    afficherAccueil();
    renderFilters();
    mettreAJourRecherche();
  })
  .catch(function (erreur) {
    console.error(erreur);
    zoneEtat.textContent = "Impossible de charger les films. Recharge la page dans un moment.";
    copierEtat();
  });
