const phoneBook = [
	{ fullName: "Jan Kowalski", phoneNo: "111-222-333", loc: "Gdańsk", isFav: true },
	{ fullName: "Maria Nowak", phoneNo: "444-555-666", loc: "Sopot", isFav: false },
	{ fullName: "Krzysztof Ibisz", phoneNo: "777-888-999", loc: "Warszawa", isFav: true }
];

const getByCity = (contacts, city) => contacts.filter(c => c.loc === city);
const getFavorites = (contacts) => contacts.filter(c => c.isFav);
const formatContact = (contacts) => contacts.map(c => `${c.fullName} — ${c.phoneNo}`);

// Rozszerzenie: Wyszukiwanie po fragmencie
const searchByNameFragment = (contacts, phrase) =>
	contacts.filter(c => c.fullName.toLowerCase().includes(phrase.toLowerCase()));

console.log("Kontakty z Warszawy:", formatContact(getByCity(phoneBook, "Warszawa")));
console.log("Ulubione kontakty:", formatContact(getFavorites(phoneBook)));
console.log("Wyszukiwanie 'nowa':", formatContact(searchByNameFragment(phoneBook, "nowa")));

/*
KOMENTARZ DO ZADANIA:
- Co działa: Czyste funkcje strzałkowe (arrow functions), łańcuchowe przekazywanie wyników do funkcji formatującej.
- Rozszerzenie własne: Dodano metodę `includes` i `toLowerCase` by uniezależnić wyszukiwarkę od wielkości liter.
- Trudność: Zaprojektowanie funkcji tak, by przyjmowały tablicę jako argument, zachowując ich reużywalność.
*/