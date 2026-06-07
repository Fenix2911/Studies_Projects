async function fetchLocalWeather(lat = 50.29, lon = 19.10) { // Rozszerzenie wejścia
	try {
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`);

		if (!response.ok) {
			throw new Error(`Błąd HTTP: ${response.status}`);
		}

		const data = await response.json();

		console.log(`--- POGODA (Lat: ${lat}, Lon: ${lon}) ---`);
		console.log(`Temperatura: ${data.current.temperature_2m} °C`);
		console.log(`Prędkość wiatru: ${data.current.wind_speed_10m} km/h`);

	} catch (error) {
		console.error("Nie udało się pobrać danych o pogodzie. Powód:", error.message);
	}
}

fetchLocalWeather();
fetchLocalWeather(52.22, 21.01); // Rozszerzenie - wywołanie dla innej lokalizacji (Warszawa)

/*
KOMENTARZ DO ZADANIA:
- Co działa: Prawidłowa obsługa asynchroniczności (async/await), fetch API oraz bezpieczne łapanie wyjątków w try...catch.
- Rozszerzenie własne: Funkcja przyjmuje szerokość i długość geograficzną jako domyślne argumenty, pozwalając na łatwe sprawdzanie innych miast.
- Trudność: Odkodowanie poprawnych właściwości obiektu JSON z API Open-Meteo (`data.current.temperature_2m`).
*/