const uniSchedule = [
	{ weekday: "poniedziałek", course: "Algorytmy", classRoom: "C2", isOnline: false },
	{ weekday: "wtorek", course: "Matematyka Dyskretna", classRoom: "Teams", isOnline: true },
	{ weekday: "wtorek", course: "Angielski", classRoom: "A1", isOnline: false },
	{ weekday: "piątek", course: "Bazy Danych", classRoom: "Zoom", isOnline: true }
];

const getClassesByDay = (schedule, day) => schedule.filter(c => c.weekday === day);

const formatSchedule = (schedule) => schedule.map(c =>
	`${c.course} — ${c.classRoom} [${c.isOnline ? 'ONLINE' : 'STACJONARNIE'}]`
);

// Rozszerzenie: filtrowanie wg trybu
const filterByMode = (schedule, onlineStatus) => schedule.filter(c => c.isOnline === onlineStatus);

const tuesdayClasses = getClassesByDay(uniSchedule, "wtorek");

console.log("Zajęcia we wtorek:\n", formatSchedule(tuesdayClasses).join("\n"));
console.log(`Liczba wszystkich zajęć w tygodniu: ${uniSchedule.length}`);
console.log(`Zajęcia wyłącznie online: ${filterByMode(uniSchedule, true).length}`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: Pobieranie z tablicy z filtrowaniem, estetyczne mapowanie z warunkiem operatora ?.
- Rozszerzenie własne: Dodano ogólną funkcję (filterByMode) sprawdzającą typ zajęć dla całego grafiku.
- Trudność: Sklejenie formatowania w jednym przejrzystym stringu (map + join).
*/