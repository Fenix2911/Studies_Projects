const holidayExpenses = [
	{ item: "paliwo", cost: 300, person: "Kuba" },
	{ item: "zakupy", cost: 150, person: "Maja" },
	{ item: "autostrada", cost: 80, person: "Kuba" },
	{ item: "kolacja", cost: 220, person: "Igor" }
];

const totalTripCost = holidayExpenses.reduce((sum, expense) => sum + expense.cost, 0);

const spentPerPerson = holidayExpenses.reduce((acc, curr) => {
	acc[curr.person] = (acc[curr.person] || 0) + curr.cost;
	return acc;
}, {});

const topSpender = Object.keys(spentPerPerson).reduce((a, b) => spentPerPerson[a] > spentPerPerson[b] ? a : b);

// Rozszerzenie: Ile każdy powinien zapłacić przy równym podziale
const uniquePeopleCount = Object.keys(spentPerPerson).length;
const evenShare = totalTripCost / uniquePeopleCount;

console.log(`Całkowity koszt wyjazdu: ${totalTripCost} PLN`);
console.log("Wydatki poszczególnych osób:", spentPerPerson);
console.log(`Najwięcej zapłacił(a): ${topSpender}`);
console.log(`Przy równym podziale każdy powinien zapłacić: ${evenShare.toFixed(2)} PLN`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: Agregacja w obiekt z dynamicznymi kluczami za pomocą reduce().
- Rozszerzenie własne: Obliczenie kosztu "na głowę" (evenShare) na podstawie ilości unikalnych kluczy w zredukowanym obiekcie.
- Trudność: Poprawna inicjalizacja dynamicznych właściwości w agregującym obiekcie (|| 0).
*/