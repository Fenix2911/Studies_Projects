const cinemaCatalog = [
	{ name: "Inception", genre: "sci-fi", score: 8.8, isWatched: true },
	{ name: "The Godfather", genre: "drama", score: 9.2, isWatched: false },
	{ name: "Interstellar", genre: "sci-fi", score: 8.6, isWatched: false },
	{ name: "Toy Story", genre: "animation", score: 7.9, isWatched: true }
];

const unwatchedMovies = cinemaCatalog.filter(movie => !movie.isWatched);
const highlyRatedMovies = cinemaCatalog.filter(movie => movie.score > 8.0);

// Rozszerzenie: Sortowanie tytułów wg oceny przed zmapowaniem
const topTitles = [...highlyRatedMovies]
	.sort((a, b) => b.score - a.score)
	.map(movie => movie.name);

console.log("Filmy do nadrobienia:", unwatchedMovies);
console.log("Same tytuły hitów (>8.0), od najlepszego:", topTitles);

/*
KOMENTARZ DO ZADANIA:
- Co działa: filter() dla stanów logicznych i liczb, map() dla ekstrakcji stringów.
- Rozszerzenie własne: Dodano sortowanie rosnące (sort) przed pobraniem tytułów filmów, przy użyciu spread (...) aby nie mutować.
- Trudność: Pamiętanie, że sort() w JS mutuje oryginalną tablicę, dlatego użyto spread operatora.
*/