# Dokumentacja Projektu: Jakość Powietrza (Air Quality)

## 1. Opis celu aplikacji
Aplikacja ma na celu monitorowanie i wyświetlanie bieżącego stanu jakości powietrza w dokładnym miejscu przebywania użytkownika. Dzięki czytelnemu interfejsowi opartemu na kartach (kafelkach), użytkownik może w ułamku sekundy zapoznać się z kluczowymi wskaźnikami zanieczyszczeń, takimi jak pyły zawieszone czy gazy niebezpieczne. Aplikacja została zaprojektowana z myślą o prostocie obsługi – dane są pobierane automatycznie po wejściu do widoku, z możliwością ręcznego odświeżenia za pomocą gestu pociągnięcia (pull-to-refresh).

## 2. Opis wykorzystanych danych z urządzenia
Aplikacja korzysta z wbudowanego w urządzenie modułu **GPS (Usługi lokalizacyjne)**.
* **Współrzędne geograficzne:** Pobierane są dokładne wartości szerokości (`latitude`) i długości (`longitude`) geograficznej.
* **Uprawnienia:** Zastosowano mechanizm żądania zgody użytkownika na dostęp do lokalizacji w tle/na pierwszym planie (`requestForegroundPermissionsAsync`). Bez udzielenia tej zgody aplikacja blokuje wysłanie zapytania i informuje o tym użytkownika.
* **Dokładność:** W celu obejścia problemów z pamięcią podręczną urządzeń, wymuszono pobieranie danych z najwyższą dostępną dokładnością (`Location.Accuracy.Highest`). Zebrane współrzędne są następnie zaokrąglane do 4 miejsc po przecinku w celu optymalizacji zapytania sieciowego.

## 3. Opis wykorzystanych bibliotek i API
* **React Native / Expo:** Główny framework użyty do budowy aplikacji wieloplatformowej (Android, iOS, Web).
* **`expo-location` (SDK):** Oficjalna biblioteka Expo do interakcji z czujnikami lokalizacji urządzenia. Odpowiada za obsługę uprawnień oraz odczyt koordynatów GPS.
* **Open-Meteo Air Quality API:** Zewnętrzne, darmowe API (niewymagające klucza autoryzacyjnego), wykorzystane do pobierania surowych danych o jakości powietrza. Zapytanie bazuje na przekazanych współrzędnych i żąda zwrotu konkretnych wskaźników:
   * `pm10` (Pył zawieszony PM10)
   * `pm2_5` (Pył zawieszony PM2.5)
   * `carbon_monoxide` (Tlenek węgla - CO)
   * `nitrogen_dioxide` (Dwutlenek azotu - NO₂)
   * `ozone` (Ozon - O₃)

## 4. Opis przepływu danych w aplikacji
1. **Inicjalizacja:** Użytkownik wchodzi na ekran aplikacji. Komponent renderuje widok ładowania (`ActivityIndicator`).
2. **Autoryzacja:** Uruchamiana jest asynchroniczna funkcja sprawdzająca/prosząca o uprawnienia do lokalizacji.
3. **Pobranie GPS:** Po uzyskaniu zgody, aplikacja odpytuje system o aktualne współrzędne geograficzne.
4. **Transformacja:** Współrzędne są przycinane do formatu akceptowanego przez API (4 miejsca po przecinku).
5. **Żądanie Sieciowe:** Wykonywany jest asynchroniczny `fetch` do API Open-Meteo z parametrami `latitude` i `longitude`.
6. **Aktualizacja Stanu (State):** Otrzymany obiekt JSON jest parsowany. Aplikacja aktualizuje stan `airData` (co wyłącza ekran ładowania i wyświetla karty z danymi) lub stan `errorMsg` (w przypadku problemów z siecią lub braku danych).
7. **Odświeżanie:** Przeciągnięcie ekranu w dół (`RefreshControl`) resetuje proces, wymuszając ponowne ustalenie GPS i nowe zapytanie do API.

## 5. Lista ograniczeń i problemów napotkanych podczas realizacji
* **Zależność od sprzętowego GPS w emulatorach:** Emulatory (np. w Android Studio) nie posiadają fizycznego modułu GPS. Wymagało to ręcznego ustawiania współrzędnych (Mock Location) poprzez *Extended Controls*.
* **Usypianie usług lokalizacyjnych na wirtualnych urządzeniach:** Nawet po ustawieniu współrzędnych, wirtualny system Android często odrzucał zapytania Expo zwracając błąd `Current location is unavailable`. Problem rozwiązano wymuszając wysoką dokładność w kodzie oraz wybudzając wirtualny GPS poprzez uruchomienie systemowej aplikacji Google Maps.
* **Problem z pamięcią podręczną (Cache) lokalizacji:** System operacyjny miał tendencję do zwracania starych współrzędnych przy kolejnych odświeżeniach. Rozwiązaniem było dodanie parametru `{ accuracy: Location.Accuracy.Highest }` do funkcji pobierającej lokalizację.
* **Ograniczenia środowiska Xcode (Mac):** Podczas testów napotkano blokadę budowania aplikacji ze względu na niezaakceptowaną licencję EULA narzędzi deweloperskich Apple, co wymagało interwencji z poziomu terminala i uprawnień administratora.
* **Ograniczenia samego API:** Aplikacja ufa danym dostarczanym przez Open-Meteo. W bardzo rzadko zaludnionych obszarach lub na morzu, API może nie zwrócić pełnego zestawu danych dla żądanych wskaźników, dla czego przewidziano dedykowany komunikat błędu.