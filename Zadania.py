#Zadanie_11
def czy_trojkat(a, b, c):
    if a + b > c and a + c > b and b + c > a:
        print("Można skonstruować trójkąt")
        obwod = a + b + c
        polowa_obwodu = obwod / 2
        pole = (polowa_obwodu * (polowa_obwodu - a) * (polowa_obwodu - b) * (polowa_obwodu - c)) ** 0.5
        print("Obwód trójkąta:", obwod)
        print("Pole trójkąta:", pole)
    else:
        print("Nie można skonstruować trójkąta")

a = float(input("Podaj długość pierwszego boku: "))
b = float(input("Podaj długość drugiego boku: "))
c = float(input("Podaj długość trzeciego boku: "))
czy_trojkat(a, b, c)

#Zadanie_12
def przelicz_temperature(temperatura, jednostka):
    if jednostka == "C":
        fahrenheit = temperatura * 9/5 + 32
        kelvin = temperatura + 273.15
        print("Temperatura w Fahrenheitach:", fahrenheit)
        print("Temperatura w Kelvinach:", kelvin)
    elif jednostka == "F":
        celsius = (temperatura - 32) * 5/9
        kelvin = celsius + 273.15
        print("Temperatura w stopniach Celsjusza:", celsius)
        print("Temperatura w Kelvinach:", kelvin)
    elif jednostka == "K":
        celsius = temperatura - 273.15
        fahrenheit = celsius * 9/5 + 32
        print("Temperatura w stopniach Celsjusza:", celsius)
        print("Temperatura w Fahrenheitach:", fahrenheit)
    else:
        print("Niepoprawna jednostka")

temperatura = float(input("Podaj temperaturę: "))
jednostka = input("Podaj jednostkę (C - Celsiusz, F - Fahrenheit, K - Kelvin): ")
przelicz_temperature(temperatura, jednostka.upper())

#Zadanie_13
def metry_na_brytyjskie(metry):
    cale = metry * 39.3701
    stopy = cale / 12
    jardy = stopy / 3
    mile = jardy / 1760
    print("Cale:", cale)
    print("Stopy:", stopy)
    print("Jardy:", jardy)
    print("Mile:", mile)

metry = float(input("Podaj długość w metrach: "))
metry_na_brytyjskie(metry)

#Zadanie_14
def czy_przestepny(rok):
    if (rok % 4 == 0 and rok % 100 != 0) or (rok % 400 == 0):
        print("Rok", rok, "jest przestępny")
    else:
        print("Rok", rok, "nie jest przestępny")

rok = int(input("Podaj rok: "))
czy_przestepny(rok)

#Zadanie_15
def rozwiaz_rownanie_liniowe(a, b):
    if a == 0:
        if b == 0:
            print("Równanie ma nieskończenie wiele rozwiązań")
        else:
            print("Równanie jest sprzeczne")
    else:
        x = -b / a
        print("Rozwiązanie równania:", x)

a = float(input("Podaj współczynnik a: "))
b = float(input("Podaj współczynnik b: "))
rozwiaz_rownanie_liniowe(a, b)

#Zadanie_16
def element_minimalny_while(A):
    if len(A) == 0:
        return None
    minimalny = A[0]
    i = 1
    while i < len(A):
        if A[i] < minimalny:
            minimalny = A[i]
        i += 1
    return minimalny

A = [5, 3, 8, 2, 1, 9, 4]
print("Element minimalny w tablicy:", element_minimalny_while(A))

#Zadanie_17
def element_minimalny_for(A):
    if len(A) == 0:
        return None
    minimalny = A[0]
    for element in A:
        if element < minimalny:
            minimalny = element
    return minimalny

A = [5, 3, 8, 2, 1, 9, 4]
print("Element minimalny w tablicy:", element_minimalny_for(A))

#Zadanie_18
def indeks_minimalnego_elementu(A):
    if len(A) == 0:
        return None
    minimalny = A[0]
    indeks = 0
    for i in range(1, len(A)):
        if A[i] < minimalny:
            minimalny = A[i]
            indeks = i
    return indeks

A = [5, 3, 8, 2, 1, 9, 4]
print("Najmniejszy indeks elementu minimalnego:", indeks_minimalnego_elementu(A))

#Zadanie_19
def najwiekszy_indeks_minimalnego_elementu(A):
    if len(A) == 0:
        return None
    minimalny = A[0]
    indeks = 0
    for i in range(1, len(A)):
        if A[i] <= minimalny:
            minimalny = A[i]
            indeks = i
    return indeks

A = [5, 3, 8, 2, 1, 9, 4]
print("Największy indeks elementu minimalnego:", najwiekszy_indeks_minimalnego_elementu(A))

#Zadanie_20
def najmniejszy_indeks_elementu_maksymalnego(A):
    if len(A) == 0:
        return None
    maksymalny = A[0]
    indeks = 0
    for i in range(1, len(A)):
        if A[i] > maksymalny:
            maksymalny = A[i]
            indeks = i
    return indeks

A = [5, 3, 8, 2, 1, 9, 4]
print("Najmniejszy indeks elementu maksymalnego:", najmniejszy_indeks_elementu_maksymalnego(A))

#Zadanie_21
def najwiekszy_indeks_elementu_maksymalnego(A):
    if len(A) == 0:
        return None
    maksymalny = A[0]
    indeks = 0
    for i in range(1, len(A)):
        if A[i] >= maksymalny:
            maksymalny = A[i]
            indeks = i
    return indeks

A = [5, 3, 8, 2, 1, 9, 9, 4, 9]
print("Największy indeks elementu maksymalnego:", najwiekszy_indeks_elementu_maksymalnego(A))

#Zadanie_22
def liczba_wystapien_elementu_minimalnego(lista):
    if not lista:
        return 0
    minimalny = lista[0]
    liczba_wystapien = 0
    for element in lista:
        if element < minimalny:
            minimalny = element
            liczba_wystapien = 1
        elif element == minimalny:
            liczba_wystapien += 1
    return liczba_wystapien

lista = [3, 5, 2, 1, 3, 2, 4, 1, 1]
print("Liczba wystąpień elementu minimalnego:", liczba_wystapien_elementu_minimalnego(lista))

#Zadanie_23
def maks_i_min_parz_nieparz(A):
    max_parz = float('-inf')
    min_nieparz = float('inf')
    for liczba in A:
        if liczba % 2 == 0 and liczba > max_parz:
            max_parz = liczba
        elif liczba % 2 != 0 and liczba < min_nieparz:
            min_nieparz = liczba
    if max_parz == float('-inf') or min_nieparz == float('inf'):
        print("Nie można obliczyć odpowiedniej wartości")
    else:
        print("Element maksymalny wśród liczb parzystych:", max_parz)
        print("Element minimalny wśród liczb nieparzystych:", min_nieparz)

A = [3, 5, 8, 2, 11, 6, 4, 9]
maks_i_min_parz_nieparz(A)

#Zadanie_24
def maks_i_min_parz_nieparz_wskazniki(A):
    max_parz = float('-inf')
    min_nieparz = float('inf')
    for i, liczba in enumerate(A):
        if i % 2 == 0 and liczba > max_parz:
            max_parz = liczba
        elif i % 2 != 0 and liczba < min_nieparz:
            min_nieparz = liczba
    print("Element maksymalny o wskaźnikach parzystych:", max_parz)
    print("Element minimalny o wskaźnikach nieparzystych:", min_nieparz)

A = [3, 5, 8, 2, 11, 6, 4, 9]
maks_i_min_parz_nieparz_wskazniki(A)

#Zadanie_25
def maks_i_drugi_maks(A):
    if len(A) < 2:
        return None
    pierwszy_max = A[0]
    drugi_max = A[1]
    for liczba in A[2:]:
        if liczba > pierwszy_max:
            drugi_max = pierwszy_max
            pierwszy_max = liczba
        elif liczba > drugi_max:
            drugi_max = liczba
    return pierwszy_max, drugi_max

A = [3, 5, 8, 2, 11, 6, 4, 9]
print("Element maksymalny oraz drugi maksymalny:", maks_i_drugi_maks(A))

#Zadanie_26
def min_i_max(A):
    if len(A) == 0:
        return None
    min_element = A[0]
    max_element = A[0]
    for liczba in A:
        if liczba < min_element:
            min_element = liczba
        elif liczba > max_element:
            max_element = liczba
    return min_element, max_element

A = [3, 5, 8, 2, 11, 6, 4, 9]
print("Element minimalny oraz maksymalny:", min_i_max(A))

#Zadanie_27
#a)
def suma_ciagu(lista):
    suma = 0
    for element in lista:
        suma += element
    return suma
#b)
def iloczyn_ciagu(lista):
    iloczyn = 1
    for element in lista:
        iloczyn *= element
    return iloczyn
#c)
def srednia_arytmetyczna_ciagu(lista):
    suma = 0
    for element in lista:
        suma += element
    srednia = suma / len(lista)
    return srednia
#d)
def srednia_arytmetyczna_dodatnich_ciagu(lista):
    suma = 0
    licznik = 0
    for element in lista:
        if element > 0:
            suma += element
            licznik += 1
    if licznik == 0:
        return None  # Nie ma dodatnich elementów w ciągu
    else:
        srednia = suma / licznik
        return srednia

#e)
def suma_ilorazow_prefiksowych_ciagu(lista):
    suma = 0
    iloczyn = 1
    for element in lista:
        iloczyn *= element
        suma += iloczyn
    return suma
#f)
def suma_ilorazow_sufiksowych_ciagu(lista):
    suma = 0
    iloczyn = 1
    for element in reversed(lista):
        iloczyn *= element
        suma += iloczyn
    return suma

#Zadanie_28
#a) Wprowadzanie danych
def oblicz_ocene(srednia):
    if srednia <= 3.25:
        return "dst"
    elif 3.26 <= srednia <= 3.75:
        return "dst +"
    elif 3.76 <= srednia <= 4.25:
        return "dobry"
    elif 4.26 <= srednia <= 4.60:
        return "dobry +"
    elif 4.61 <= srednia <= 4.80:
        return "bdb"
    else:
        return "celujący"


def main():
    oceny = []
    while True:
        ocena = input("Podaj ocenę studenta lub wpisz 'koniec', aby zakończyć: ")
        if ocena.lower() == 'koniec':
            break
        try:
            ocena = float(ocena)
            if ocena < 2 or ocena > 5:
                print("Ocena musi być liczbą z przedziału [2, 5]. Spróbuj ponownie.")
                continue
            oceny.append(ocena)
        except ValueError:
            print("Niepoprawny format oceny. Podaj liczbę z przedziału [2, 5].")

    ilosc_ocen = len(oceny)
    if ilosc_ocen == 0:
        print("Nie podano żadnych ocen.")
    else:
        srednia = sum(oceny) / ilosc_ocen
        print(f"Podano {ilosc_ocen} ocen.")
        print(f"Średnia ocen: {srednia:.2f}")
        print(f"Ocena studenta: {oblicz_ocene(srednia)}")


if __name__ == "__main__":
    main()

#b) Lista danych
def oblicz_ocene(srednia):
    if srednia <= 3.25:
        return "dst"
    elif 3.26 <= srednia <= 3.75:
        return "dst +"
    elif 3.76 <= srednia <= 4.25:
        return "dobry"
    elif 4.26 <= srednia <= 4.60:
        return "dobry +"
    elif 4.61 <= srednia <= 4.80:
        return "bdb"
    else:
        return "celujący"


def main():
    oceny = [float(ocena) for ocena in input("Podaj oceny studenta oddzielone spacją: ").split()]
    if not oceny:
        print("Nie podano żadnych ocen.")
        return

    ilosc_ocen = len(oceny)
    srednia = sum(oceny) / ilosc_ocen
    print(f"Podano {ilosc_ocen} ocen.")
    print(f"Średnia ocen: {srednia:.2f}")
    print(f"Ocena studenta: {oblicz_ocene(srednia)}")


if __name__ == "__main__":
    main()

#Zadanie_29
#a)Musisz przejść przez szarą ramkę 8 razy
def czyParzysta(liczba):
    if liczba % 2 == 0:
        liczba/2
    else:
        return False