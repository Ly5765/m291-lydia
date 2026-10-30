

const films = [
  {
    title: "Inception",
    year: 2010,
    duration: "2h 28min",
    mood: "Mystérieux",
    poster: "poster-inception",
    image: "images/supradoc-aKovdEv8pXI-unsplash.jpg",
    description: "Dom Cobb est un voleur expérimenté, capable d'extraire des secrets en plongeant dans les rêves de ses victimes. Mais cette fois, le contrat est différent : il doit implanter une idée dans l'esprit d'un homme. Une mission impossible qui pourrait tout changer.",
    popularity: 10
  },
  {
    title: "Le Cercle",
    year: 2002,
    duration: "1h 55min",
    mood: "Mystérieux",
    poster: "poster-circle",
    image: "images/camila-quintero-franco-mC852jACK1g-unsplash.jpg",
    detailImagePosition: "center 12%",
    description: "Une journaliste enquête sur une mystérieuse vidéo liée à des événements inquiétants. Plus elle cherche la vérité, plus le danger se rapproche.",
    popularity: 8
  },
  {
    title: "Gone Girl",
    year: 2014,
    duration: "2h 29min",
    mood: "Qui fait réfléchir",
    poster: "poster-gone-girl",
    image: "images/joel-mott-AkWrH8EbqrM-unsplash.jpg",
    description: "Lorsqu'une femme disparaît, son mari devient le principal suspect. Les apparences se révèlent trompeuses dans cette enquête pleine de secrets.",
    popularity: 9
  },
  {
    title: "Sixième sens",
    year: 1999,
    duration: "1h 47min",
    mood: "Effrayant",
    poster: "poster-sixth",
    image: "images/alexandre-lallemand-gZpM8PjMdBo-unsplash.jpg",
    description: "Un jeune garçon affirme voir des choses que les autres ne peuvent pas voir. Un psychologue tente de comprendre son secret.",
    popularity: 7
  },
  {
    title: "Interstellar",
    year: 2014,
    duration: "2h 49min",
    mood: "Qui fait réfléchir",
    poster: "poster-interstellar",
    image: "images/norbert-kowalczyk-RCaWMbUmyJ8-unsplash.jpg",
    description: "Alors que la Terre devient difficile à habiter, une équipe part dans l'espace à la recherche d'un avenir pour l'humanité.",
    popularity: 10
  },
  {
    title: "The Batman",
    year: 2022,
    duration: "2h 56min",
    mood: "Effrayant",
    poster: "poster-batman",
    image: "images/anton-kotlovskii-3OhH5a6EgPc-unsplash.jpg",
    description: "Dans une ville plongée dans la corruption, Batman suit une série d'indices qui révèlent une menace plus vaste qu'il ne l'imaginait.",
    popularity: 8
  },
  {
    title: "Le Fabuleux Destin",
    year: 2001,
    duration: "2h 02min",
    mood: "Réconfortant",
    poster: "poster-gone-girl",
    image: "images/mita-64-i2ErE8xS4fQ-unsplash.jpg",
    description: "Une jeune femme décide de transformer la vie des personnes qui l'entourent par de petits gestes inattendus.",
    popularity: 8
  },
  {
    title: "Intouchables",
    year: 2011,
    duration: "1h 52min",
    mood: "Drôle",
    poster: "poster-sixth",
    image: "images/chang-duong-Sj0iMtq_Z4w-unsplash.jpg",
    description: "Une rencontre improbable donne naissance à une amitié pleine d'humour, de surprises et d'émotions.",
    popularity: 9
  },
  {
    title: "Orgueil et Préjugés",
    year: 2005,
    duration: "2h 09min",
    mood: "Romantique",
    poster: "poster-circle",
    image: "images/everton-vila-AsahNlC0VhQ-unsplash.jpg",
    description: "Entre premières impressions, malentendus et sentiments naissants, deux personnes apprennent à se découvrir.",
    popularity: 7
  }
];

const moodNames = [
  "Réconfortant",
  "Drôle",
  "Effrayant",
  "Romantique",
  "Qui fait réfléchir",
  "Mystérieux"
];

const screens = {
  home: document.querySelector("#home-screen"),
  search: document.querySelector("#search-screen"),
  detail: document.querySelector("#detail-screen")
};

const homeFilms = document.querySelector("#home-films");
const searchFilms = document.querySelector("#search-films");
const filterList = document.querySelector("#filter-list");
const searchInput = document.querySelector("#film-search");
const homeSearch = document.querySelector("#home-search");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");

let selectedMood = "Mystérieux";
let currentFilm = films[0];
let previousScreen = "search";

function createFilmCard(film) {
  const card = document.createElement("article");
  card.className = "film-card";

  const cardButton = document.createElement("button");
  cardButton.type = "button";
  cardButton.className = "film-card-button";
  cardButton.setAttribute("aria-label", `Voir la fiche de ${film.title}`);

  const poster = document.createElement("span");
  poster.className = `poster ${film.poster} has-image`;
  poster.setAttribute("aria-hidden", "true");

  const posterImage = document.createElement("img");
  posterImage.className = "poster-image";
  posterImage.src = film.image;
  posterImage.alt = "";
  posterImage.loading = "lazy";

  const posterLabel = document.createElement("span");
  posterLabel.className = "poster-label";
  posterLabel.textContent = film.title.toUpperCase();
  poster.append(posterImage, posterLabel);

  const title = document.createElement("span");
  title.className = "film-title";
  title.textContent = film.title;

  const year = document.createElement("span");
  year.className = "film-year";
  year.textContent = String(film.year);

  const badge = document.createElement("span");
  badge.className = "mood-badge";
  badge.textContent = `✦ ${film.mood}`;

  cardButton.append(poster, title, year, badge);
  card.append(cardButton);
  cardButton.addEventListener("click", () => showDetail(film));

  return card;
}

function renderHomeFilms() {
  homeFilms.replaceChildren();

  films.slice(0, 3).forEach((film) => {
    homeFilms.append(createFilmCard(film));
  });
}

function renderFilters() {
  filterList.replaceChildren();

  moodNames.forEach((mood) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.dataset.mood = mood;
    chip.textContent = mood;
    chip.setAttribute("aria-pressed", String(selectedMood === mood));

    chip.addEventListener("click", () => {
      selectedMood = selectedMood === mood ? "" : mood;
      renderFilters();
      renderSearchFilms();
    });

    filterList.append(chip);
  });
}

function renderSearchFilms() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const sort = document.querySelector("#sort-select").value;

  let filtered = films.filter((film) => {
    const matchesMood = !selectedMood || film.mood === selectedMood;
    const matchesQuery =
      `${film.title} ${film.mood} ${film.year}`
        .toLocaleLowerCase("fr")
        .includes(query);

    return matchesMood && matchesQuery;
  });

  if (sort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title, "fr"));
  } else if (sort === "recent") {
    filtered.sort((a, b) => b.year - a.year);
  } else {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  searchFilms.replaceChildren();
  filtered.forEach((film) => {
    searchFilms.append(createFilmCard(film));
  });

  resultsCount.textContent =
    `${filtered.length} film${filtered.length > 1 ? "s" : ""} trouvé${filtered.length > 1 ? "s" : ""}`;

  emptyMessage.hidden = filtered.length !== 0;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== name;
  });

  document.querySelector("#back-button").hidden = name === "home";
  document.querySelector(".bottom-nav").hidden = name === "detail";

  document.querySelector("#nav-home").classList.toggle("active", name === "home");
  document.querySelector("#nav-search").classList.toggle("active", name === "search");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSearch(mood = "") {
  selectedMood = mood;
  searchInput.value = "";
  renderFilters();
  renderSearchFilms();
  showScreen("search");
  document.querySelector("#nav-search").focus();
}

function showDetail(film) {
  previousScreen = screens.home.hidden ? "search" : "home";
  currentFilm = film;

  document.querySelector("#detail-title").textContent = film.title;
  document.querySelector("#detail-year").textContent = film.year;
  document.querySelector("#detail-duration").textContent = film.duration;
  document.querySelector("#detail-mood").textContent = `✦ ${film.mood}`;
  document.querySelector("#detail-description").textContent = film.description;

  const poster = document.querySelector("#detail-poster");
  poster.className = "detail-poster";
  poster.replaceChildren();
  const posterImage = document.createElement("img");
  posterImage.src = film.image;
  posterImage.alt = "";
  posterImage.style.objectPosition = film.detailImagePosition || "center";
  poster.setAttribute("aria-label", `Image du film ${film.title}`);
  poster.append(posterImage);

  document.querySelector("#watch-message").textContent = "";
  showScreen("detail");
  document.querySelector("#detail-back").focus();
}

function showHome() {
  showScreen("home");
  document.querySelector("#logo").focus();
}

document.querySelectorAll(".mood-tile").forEach((button) => {
  button.addEventListener("click", () => {
    showSearch(button.dataset.mood);
  });
});

document.querySelector("#home-search").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchInput.value = homeSearch.value;
    showSearch("");
    searchInput.value = homeSearch.value;
    renderSearchFilms();
    searchInput.focus();
  }
});

document.querySelector("#search-button").addEventListener("click", () => {
  showSearch("");
  searchInput.focus();
});

document.querySelector("#all-films-button").addEventListener("click", () => {
  showSearch("");
});

searchInput.addEventListener("input", renderSearchFilms);

document.querySelector("#sort-select").addEventListener("change", renderSearchFilms);

document.querySelector("#nav-home").addEventListener("click", showHome);

document.querySelector("#nav-search").addEventListener("click", () => {
  showSearch("");
});

document.querySelector("#nav-profile").addEventListener("click", () => {
  alert("La section Profil sera ajoutée plus tard.");
});

document.querySelector("#back-button").addEventListener("click", () => {
  if (screens.detail.hidden === false) {
    showScreen(previousScreen);
  } else {
    showHome();
  }
});

document.querySelector("#detail-back").addEventListener("click", () => {
  showScreen(previousScreen);
});

document.querySelector("#home-button").addEventListener("click", showHome);

document.querySelector("#logo").addEventListener("click", (event) => {
  event.preventDefault();
  showHome();
});

document.querySelector("#watch-button").addEventListener("click", () => {
  document.querySelector("#watch-message").textContent =
    `Le bouton « Voir le film » est prêt pour le lien de diffusion de ${currentFilm.title}.`;
});

renderHomeFilms();
renderFilters();
renderSearchFilms();
showScreen("home");

