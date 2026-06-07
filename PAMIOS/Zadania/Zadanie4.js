const bringsLaptop = true;
const bringsCharger = false;
const bringsNotebook = true;
const classType = "wykład";
const hasCoffee = true; // Rozszerzenie

if (bringsLaptop && bringsNotebook) {
	console.log("Student ma podstawowy sprzęt.");
} else {
	console.log("Studentowi brakuje podstawowego sprzętu.");
}

const readinessStatus = (bringsLaptop || bringsNotebook) ? "Gotowy do nauki" : "Niegotowy do nauki";
console.log(`Status: ${readinessStatus}`);

bringsLaptop && !bringsCharger && console.log("Ostrzeżenie: Masz laptopa, ale zapomniałeś ładowarki!");

if (classType === "laboratorium") {
	console.log("Dzisiaj laboratorium - upewnij się, że masz środowisko programistyczne.");
} else if (classType === "wykład") {
	console.log("Dzisiaj wykład - skup się na notowaniu.");
}

hasCoffee && console.log("Dodatkowo: Masz kawę, przeżyjesz ten dzień!"); // Rozszerzenie

/*
KOMENTARZ DO ZADANIA:
- Co działa: if...else, operator trójargumentowy (?), operator logiczny (&&) dla short-circuit evaluation.
- Rozszerzenie własne: Dodano zmienną hasCoffee i warunkowy, motywujący komunikat.
- Trudność: Zwięzłe zapisywanie warunków przy użyciu &&.
*/