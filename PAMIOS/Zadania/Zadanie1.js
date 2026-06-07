const studentProfile = {
	firstName: "Karolina",
	lastName: "Nowak",
	city: "Kraków",
	age: 22,
	fieldOfStudy: "Informatyka Stosowana",
	favoriteLanguage: "JavaScript" // Rozszerzenie
};

console.log(`${studentProfile.firstName} ${studentProfile.lastName}`);
console.log(`Studentka z miasta ${studentProfile.city}, studiuje: ${studentProfile.fieldOfStudy}.`);
console.log(studentProfile.age >= 18 ? "Użytkownik jest pełnoletni." : "Użytkownik jest niepełnoletni.");
console.log(`Jej ulubiony język programowania to ${studentProfile.favoriteLanguage}.`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: Prawidłowe odczytywanie pól obiektu, template literals, warunek pełnoletności.
- Rozszerzenie własne: Dodano pole `favoriteLanguage` i dedykowany komunikat.
- Trudność: Brak większych trudności, proste operacje na obiektach.
*/