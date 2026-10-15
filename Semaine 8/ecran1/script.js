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
  { title: "Inception", mood: "Mystérieux", poster: "inception", year: "2010" },
  { title: "Gone Girl", mood: "Mystérieux", poster: "gone-girl", year: "2014" },
  { title: "Le Cercle", mood: "Mystérieux", poster: "cercle", year: "2002" },
  { title: "Sixième sens", mood: "Effrayant", poster: "sixieme-sens", year: "1999" },
  { title: "Interstellar", mood: "Qui fait réfléchir", poster: "interstellar", year: "2014" },
  { title: "The Batman", mood: "Mystérieux", poster: "batman", year: "2022" }
];

let selectedMood = null;
let searchText = "";

function render() {
  const visibleMovies = movies.filter((movie) => {
    const matchesMood = !selectedMood || movie.mood === selectedMood;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesMood && matchesSearch;
  });

  app.innerHTML = `
    <header>
      <h1>Cine<span class="logo-blue">Mood</span></h1>
      <button class="profile-button" type="button" aria-label="Profil">◎</button>
    </header>

    <label class="search">
      <span aria-hidden="true">⌕</span>
      <input
        id="search-input"
        type="search"
        placeholder="Rechercher un film, un genre..."
        value="${searchText}"
      >
    </label>

    <h2>Quel mood ce soir ?</h2>

    <section class="moods" aria-label="Choisir un mood">
      ${moods.map((mood) => `
        <button
          class="mood-button ${selectedMood === mood.name ? "selected" : ""}"
          type="button"
          data-mood="${mood.name}"
          aria-pressed="${selectedMood === mood.name}"
        >
          <span class="mood-icon" aria-hidden="true">${mood.icon}</span>
          <span>${mood.name}</span>
        </button>
      `).join("")}
    </section>

    <div class="section-heading">
      <h2>Films pour toi</h2>
      <button class="arrow-button" id="clear-mood" type="button" aria-label="Afficher tous les films">→</button>
    </div>

    <section class="movies" aria-label="Films recommandés">
      ${visibleMovies.length ? visibleMovies.map((movie) => `
        <button class="movie-card" type="button" data-title="${movie.title}">
          <span class="poster ${movie.poster}">
            <span class="poster-title">${movie.title.toUpperCase()}</span>
          </span>
          <strong>${movie.title}</strong>
          <span class="mood-tag">★ ${movie.mood}</span>
        </button>
      `).join("") : `
        <p class="empty-message">Aucun film trouvé. Essaie un autre titre ou mood.</p>
      `}
    </section>

    <nav class="bottom-nav" aria-label="Navigation">
      <div class="bottom-nav-inner">
        <div class="nav-item active"><span>⌂</span><span>Accueil</span></div>
        <div class="nav-item"><span>⌕</span><span>Recherche</span></div>
        <div class="nav-item"><span>♙</span><span>Profil</span></div>
      </div>
    </nav>
  `;

  document.querySelectorAll("[data-mood]").forEach((button) => {
    button.addEventListener("click", () => {
      const mood = button.dataset.mood;
      selectedMood = selectedMood === mood ? null : mood;
      render();
    });
  });

  document.querySelector("#clear-mood").addEventListener("click", () => {
    selectedMood = null;
    searchText = "";
    render();
  });

  document.querySelector("#search-input").addEventListener("input", (event) => {
    searchText = event.target.value;
    const cursorPosition = event.target.selectionStart;
    render();
    const input = document.querySelector("#search-input");
    input.focus();
    input.setSelectionRange(cursorPosition, cursorPosition);
  });
}

render();