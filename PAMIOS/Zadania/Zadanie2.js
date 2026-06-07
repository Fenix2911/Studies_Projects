const weeklyExpenses = [22.5, 50, 12.99, 30, 75.2, 18, 41.5];

const totalSpent = weeklyExpenses.reduce((sum, cost) => sum + cost, 0);
const averageExpense = totalSpent / weeklyExpenses.length;
const maxExpense = Math.max(...weeklyExpenses);
const highExpensesCount = weeklyExpenses.filter(cost => cost > 40).length; // Rozszerzenie

console.log(`--- RAPORT WYDATKÓW ---`);
console.log(`Suma: ${totalSpent.toFixed(2)} PLN`);
console.log(`Średnia: ${averageExpense.toFixed(2)} PLN`);
console.log(`Największy wydatek: ${maxExpense.toFixed(2)} PLN`);
console.log(`Liczba wydatków powyżej 40 PLN: ${highExpensesCount}`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: reduce(), Math.max() z operatorem spread, wyliczenie średniej.
- Rozszerzenie własne: Dodano licznik wydatków przekraczających 40 PLN z użyciem filter().
- Trudność: Pamiętanie o zaokrąglaniu ułamków (toFixed) przy logowaniu kwot.
*/