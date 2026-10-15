const app = document.querySelector("#app");

const moods = [
  { name: "Réconfortant", icon: "☕" },
  { name: "Drôle", icon: "☻" },
  { name: "Effrayant", icon: "👻" },
  { name: "Romantique", icon: "♡" },
  { name: "Qui fait réfléchir", icon: "♧" },
  { name: "Mystérieux", icon: "☆" }
];

const movies = [
  {
    title: "Inception",
    year: "2010",
    duration: "2h 28min",
    mood: "Mystérieux",
    poster: "inception",
    description: "Dom Cobb entre dans les rêves pour y dérober des secrets. Sa mission la plus difficile pourrait changer sa vie."
  },
  {
    title: "Gone Girl",
    year: "2014",
    duration: "2h 29min",
    mood: "Mystérieux",
    poster: "gone-girl",
    description: "Après la disparition de sa femme, Nick devient le principal suspect d’une enquête pleine de secrets."
  },
  {
    title: "Le Cercle",
    year: "2002",
    duration: "1h 55min",
    mood: "Mystérieux",
    poster: "cercle",
    description: "Une journaliste enquête sur une cassette vidéo mystérieuse et sur la légende qui l’accompagne."
  },
  {
    title: "Sixième sens",
    year: "1999",
    duration: "1h 47min",
    mood: "Effrayant",
    poster: "sixieme-sens",
    description: "Un psychologue aide un enfant qui affirme voir des personnes que personne d’autre ne voit."
  },
  {
    title: "Interstellar",
    year: "2014",
    duration: "2h 49min",
    mood: "Qui fait réfléchir",
    poster: "interstellar",
    description: "Une équipe part chercher un nouvel avenir pour l’humanité au-delà de notre système solaire."
  },
  {
    title: "The Batman",
    year: "2022",
    duration: "2h 56min",
    mood: "Mystérieux",
    poster: "batman",
    description: "Batman suit une série d’indices pour découvrir qui menace Gotham."
  },
  {
    title: "Intouchables",
    year: "2011",
    duration: "1h 52min",
    mood: "Réconfortant",
    poster: "intouchables",
    description: "Une rencontre inattendue donne naissance à une amitié drôle et touchante."
  },
  {
    title: "Le Dîner de cons",
    year: "1998",
    duration: "1h 20min",
    mood: "Drôle",
    poster: "diner",
    description: "Un dîner entre amis tourne à la catastrophe à cause d’un invité plein de surprises."
  },
  {
    title: "La La Land",
    year: "2016",
    duration: "2h 08min",
    mood: "Romantique",
    poster: "lalaland",
    description: "À Los Angeles, deux artistes poursuivent leurs rêves et vivent une histoire d’amour."
  }
];

let selectedMood = null;
let searchText = "";
let returnScreen = "home";

function getMatchingMovies() {
  return movies.filter((movie) => {
    const matchesMood = !selectedMood || movie.mood === selectedMood;
    const search = searchText.toLowerCase();

    const matchesSearch =
      movie.title.toLowerCase().includes(search) ||
      movie.mood.toLowerCase().includes(search);

    return matchesMood && matchesSearch;
  });
}

function createMovieCards(list, source) {
  if (list.length === 0) {
    return `<p class="empty-message">Aucun film trouvé. Essaie un autre titre ou mood.</p>`;
  }

  return list.map((movie) => `
    <button
      class="movie-card"
      type="button"
      data-title="${movie.title}"
      data-source="${source}"
      aria-label="Ouvrir la fiche de ${movie.title}"
    >
      <span class="poster ${movie.poster}">
        <span class="poster-title">${movie.title.toUpperCase()}</span>
      </span>

      <strong>${movie.title}</strong>
      <span class="movie-meta">${movie.year} · ${movie.duration}</span>
      <span class="mood-tag">★ ${movie.mood}</span>
      <span class="movie-description">${movie.description}</span>
    </button>
  `).join("");
}

function createBottomNavigation(activePage) {
  return `
    <nav class="bottom-nav" aria-label="Navigation">
      <div class="bottom-nav-inner">
        <button
          class="nav-item ${activePage === "home" ? "active" : ""}"
          type="button"
          data-page="home"
        >
          <span aria-hidden="true">⌂</span>
          <span>Accueil</span>
        </button>

        <button
          class="nav-item ${activePage === "search" ? "active" : ""}"
          type="button"
          data-page="search"
        >
          <span aria-hidden="true">⌕</span>
          <span>Recherche</span>
        </button>

        <div class="nav-item" aria-label="Profil">
          <span aria-hidden="true">♙</span>
          <span>Profil</span>
        </div>
      </div>
    </nav>
  `;
}

function connectMovieCards() {
  document.querySelectorAll(".movie-card").forEach((button) => {
    button.addEventListener("click", () => {
      const movie = movies.find((item) => item.title === button.dataset.title);

      if (movie) {
        showMovie(movie, button.dataset.source);
      }
    });
  });
}

function connectNavigation() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.page === "home") {
        showHome();
      }

      if (button.dataset.page === "search") {
        showResults();
      }
    });
  });
}

function showHome() {
  selectedMood = null;
  searchText = "";

  app.innerHTML = `
    <header>
      <h1>Cine<span class="logo-blue">Mood</span></h1>
      <button class="profile-button" type="button" aria-label="Profil">◎</button>
    </header>

    <label class="search">
      <span aria-hidden="true">⌕</span>
      <input
        id="home-search"
        type="search"
        placeholder="Rechercher un film, un genre..."
      >
    </label>

    <h2>Quel mood ce soir ?</h2>

    <section class="moods" aria-label="Choisir un mood">
      ${moods.map((mood) => `
        <button class="mood-button" type="button" data-mood="${mood.name}">
          <span class="mood-icon" aria-hidden="true">${mood.icon}</span>
          <span>${mood.name}</span>
        </button>
      `).join("")}
    </section>

    <div class="section-heading">
      <h2>Films pour toi</h2>
      <button
        class="arrow-button"
        id="all-films"
        type="button"
        aria-label="Voir tous les films"
      >→</button>
    </div>

    <section id="home-movies" class="movies" aria-label="Films recommandés"></section>

    ${createBottomNavigation("home")}
  `;

  updateHomeMovies();

  document.querySelectorAll("[data-mood]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedMood = button.dataset.mood;
      showResults();
    });
  });

  document.querySelector("#all-films").addEventListener("click", () => {
    showResults();
  });

  document.querySelector("#home-search").addEventListener("input", (event) => {
    searchText = event.target.value;
    updateHomeMovies();
  });

  connectNavigation();
}

function updateHomeMovies() {
  const grid = document.querySelector("#home-movies");
  if (!grid) return;

  grid.innerHTML = createMovieCards(getMatchingMovies(), "home");
  connectMovieCards();
}

function showResults() {
  app.innerHTML = `
    <div class="page-topbar">
      <button
        class="topbar-back"
        id="back-home"
        type="button"
        aria-label="Retour à l’accueil"
      >‹</button>

      <h1 class="topbar-logo">Cine<span class="logo-blue">Mood</span></h1>

      <button
        class="topbar-action"
        id="focus-search"
        type="button"
        aria-label="Aller à la recherche"
      >⌕</button>
    </div>

    <label class="search">
      <span aria-hidden="true">⌕</span>
      <input
        id="results-search"
        type="search"
        placeholder="Rechercher un film, un genre..."
      >
    </label>

    <section class="filter-chips" aria-label="Filtrer par mood">
      ${moods.map((mood) => `
        <button
          class="filter-chip ${selectedMood === mood.name ? "is-selected" : ""}"
          type="button"
          data-filter-mood="${mood.name}"
          aria-pressed="${selectedMood === mood.name}"
        >${mood.name}</button>
      `).join("")}
    </section>

    <div class="results-heading">
      <div>
        <h2>Films pour toi</h2>
        <p id="results-count" class="results-count"></p>
      </div>
      <span class="sort-label">Les mieux notés</span>
    </div>

    <section
      id="results-movies"
      class="movies"
      aria-label="Résultats des films"
      aria-live="polite"
    ></section>

    ${createBottomNavigation("search")}
  `;

  const searchInput = document.querySelector("#results-search");
  searchInput.value = searchText;

  updateResults();

  document.querySelector("#back-home").addEventListener("click", () => {
    showHome();
  });

  document.querySelector("#focus-search").addEventListener("click", () => {
    searchInput.focus();
  });

  searchInput.addEventListener("input", (event) => {
    searchText = event.target.value;
    updateResults();
  });

  document.querySelectorAll("[data-filter-mood]").forEach((button) => {
    button.addEventListener("click", () => {
      const mood = button.dataset.filterMood;
      selectedMood = selectedMood === mood ? null : mood;
      showResults();
    });
  });

  connectNavigation();
}

function updateResults() {
  const list = getMatchingMovies();
  const count = document.querySelector("#results-count");
  const grid = document.querySelector("#results-movies");

  if (!grid || !count) return;

  count.textContent =
    `${list.length} film${list.length === 1 ? "" : "s"} trouvé${list.length === 1 ? "" : "s"}`;

  grid.innerHTML = createMovieCards(list, "results");
  connectMovieCards();
}

function showMovie(movie, source) {
  returnScreen = source || "home";

  app.innerHTML = `
    <div class="detail-topbar">
      <button
        class="topbar-back"
        id="back-from-detail"
        type="button"
        aria-label="Retour aux films"
      >‹</button>
      <span>Retour</span>
    </div>

    <div
      class="detail-cover poster ${movie.poster}"
      role="img"
      aria-label="Affiche de ${movie.title}"
    >
      <span class="poster-title">${movie.title.toUpperCase()}</span>
      <span class="play-icon" aria-hidden="true">▶</span>
    </div>

    <article class="movie-detail">
      <h1>${movie.title}</h1>

      <p class="detail-meta">
        <span aria-hidden="true">▦</span>
        ${movie.year}
        <span aria-hidden="true">·</span>
        <span aria-hidden="true">◷</span>
        ${movie.duration}
      </p>

      <span class="mood-tag detail-tag">★ ${movie.mood}</span>

      <h2>Description</h2>
      <p class="detail-description">${movie.description}</p>

      <button class="detail-primary" id="watch-movie" type="button">
        ▶ &nbsp; Voir le film
      </button>

      <button class="detail-secondary" id="go-home" type="button">
        ⌂ &nbsp; Retour à l’accueil
      </button>
    </article>
  `;

  document.querySelector("#back-from-detail").addEventListener("click", () => {
    if (returnScreen === "results") {
      showResults();
    } else {
      showHome();
    }
  });

  document.querySelector("#go-home").addEventListener("click", () => {
    showHome();
  });

  document.querySelector("#watch-movie").addEventListener("click", () => {
    alert("Cette maquette ne lance pas réellement le film.");
  });
}

showHome();