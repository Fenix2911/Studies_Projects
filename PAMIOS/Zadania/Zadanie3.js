const myShoppingList = [
	{ item: "jabłka", amount: 5, isUrgent: false },
	{ item: "kawa", amount: 1, isUrgent: true },
	{ item: "masło", amount: 2, isUrgent: true },
	{ item: "ryż", amount: 1, isUrgent: false }
];

console.log("Wszystkie produkty:", myShoppingList.map(p => p.item).join(", "));

const urgentItems = myShoppingList.filter(product => product.isUrgent);
const uppercaseNames = myShoppingList.map(product => product.item.toUpperCase());
const totalItemsToBuy = myShoppingList.reduce((sum, p) => sum + p.amount, 0); // Rozszerzenie

console.log(`Liczba pozycji pilnych: ${urgentItems.length}`);
console.log(`Nazwy produktów (wielkie litery): ${uppercaseNames.join(", ")}`);
console.log(`Łączna liczba sztuk do kupienia: ${totalItemsToBuy}`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: filter() dla priorytetów, map() dla wielkich liter, tablica pierwotna jest nietknięta.
- Rozszerzenie własne: Obliczenie łącznej ilości sztuk produktów do kupienia (reduce).
- Trudność: Płynne łączenie metod tablicowych.
*/