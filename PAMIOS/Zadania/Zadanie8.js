const studentMarks = [3.5, 4.0, 5.0, 4.5, 2.0];

function evaluateStudent(marksArray) {
	const averageMark = marksArray.reduce((acc, mark) => acc + mark, 0) / marksArray.length;
	const passThreshold = 3.0;

	const isPassed = averageMark >= passThreshold;

	// Rozszerzenie: Klasyfikacja słowna
	let classification = "Niedostateczny";
	if (averageMark >= 4.5) classification = "Bardzo dobry";
	else if (averageMark >= 3.5) classification = "Dobry";
	else if (averageMark >= passThreshold) classification = "Dostateczny";

	return {
		average: averageMark.toFixed(2),
		status: isPassed ? "Zaliczone" : "Niezaliczone",
		gradeText: classification
	};
}

console.log("Wynik studenta:", evaluateStudent(studentMarks));

/*
KOMENTARZ DO ZADANIA:
- Co działa: Funkcja agreguje liczby za pomocą reduce i zwraca obiekt z logiką warunkową.
- Rozszerzenie własne: Dodano dodatkową klasyfikację ocen (bardzo dobry, dobry, dostateczny).
- Trudność: Umieszczenie całej logiki wyliczeniowej w zwracanym obiekcie, by kod był czystszy.
*/