const weeklyWorkouts = [
	{ activity: "bieg", duration: 45, kcal: 450 },
	{ activity: "pływanie", duration: 30, kcal: 300 },
	{ activity: "joga", duration: 20, kcal: 100 },
	{ activity: "rower", duration: 90, kcal: 600 }
];

const totalDuration = weeklyWorkouts.reduce((sum, w) => sum + w.duration, 0);
const totalKcal = weeklyWorkouts.reduce((sum, w) => sum + w.kcal, 0);
const longWorkouts = weeklyWorkouts.filter(w => w.duration > 30);

// Rozszerzenie: Znalezienie treningu z największą liczbą spalonych kalorii
const mostCaloric = weeklyWorkouts.reduce((prev, current) => (prev.kcal > current.kcal) ? prev : current);

console.log(`--- RAPORT TYGODNIOWY ---`);
console.log(`Łączny czas aktywności: ${totalDuration} minut.`);
console.log(`Łącznie spalono: ${totalKcal} kalorii.`);
console.log(`Długie treningi (>30 min): ${longWorkouts.length}`);
console.log(`Najbardziej kaloryczny trening to ${mostCaloric.activity} (${mostCaloric.kcal} kcal).`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: Redukcja do jednej liczby oraz filtrowanie obiektów.
- Rozszerzenie własne: Wykorzystanie reduce() do wyłonienia pojedynczego obiektu z największą wartością kcal.
- Trudność: Poprawne napisanie logiki porównującej obiekty w funkcji callback reduce.
*/