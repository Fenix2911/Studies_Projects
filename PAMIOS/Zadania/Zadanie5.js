const dailyTasks = ["wykład", "siłownia", "czytanie książki"];

function generateDayPlan(userName, tasksList = []) {
	if (tasksList.length === 0) {
		return `${userName} ma dzisiaj dzień wolny!`;
	}

	// Rozszerzenie: mapowanie do numerowanej listy
	const numberedTasks = tasksList.map((task, index) => `${index + 1}. ${task}`).join('\n');

	return `Plan dnia dla ${userName} (Liczba zadań: ${tasksList.length}):\n${numberedTasks}`;
}

console.log(generateDayPlan("Adam", dailyTasks));
console.log("---");
console.log(generateDayPlan("Ewa"));

/*
KOMENTARZ DO ZADANIA:
- Co działa: Funkcja zwracająca string, parametry domyślne obsłużone poprawnie.
- Rozszerzenie własne: Użycie map() wewnątrz funkcji do zwrócenia czytelnej, numerowanej listy zadań oraz zliczanie zadań.
- Trudność: Złożenie estetycznego stringa wielolinijkowego z tablicy.
*/