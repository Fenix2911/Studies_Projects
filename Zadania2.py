def bubble_sort(T):
    n = len(T)
    for i in range(2, n + 1):
        for j in range(n, i - 1, -1):
            if T[j - 1] > T[j - 2]:
                T[j - 1], T[j - 2] = T[j - 2], T[j - 1]
    return T


T1 = [14, 40, 31, 28, 3, 15, 17, 51]
T2 = [3, 14, 15, 17, 28, 31, 50, 60]
T3 = [51, 40, 31, 28, 17, 15, 14, 3]
T4 = [23, 23, 23, 23, 23, 23, 23, 23]

sorted_T1 = bubble_sort(T1)
sorted_T2 = bubble_sort(T2)
sorted_T3 = bubble_sort(T3)
sorted_T4 = bubble_sort(T4)

print(sorted_T1)
print(sorted_T2)
print(sorted_T3)
print(sorted_T4)

"""Złożoność obliczeniowa algorytmu sortowania bąbelkowego:"
 "Pesymistyczna (najgorszy przypadek): ( O(n^2) ) - występuje, gdy tablica jest posortowana odwrotnie i każdy element musi być porównany z każdym innym."
 "Optymistyczna (najlepszy przypadek): ( O(n) ) - występuje, gdy tablica jest już posortowana, i nie są potrzebne żadne zamiany.Porównanie teoretyczne z wynikami eksperymentalnymi:Teoretycznie, dla tablicy o rozmiarze ( n ),"
 "algorytm wykonuje n(n-1)/2 ) porównań w najgorszym przypadku.
 Eksperymentalnie, można przetestować algorytm na tablicach z poprzedniego zadania i zmierzyć czas wykonania lub liczbę porównań/zamian, aby zobaczyć, jak te wartości skalują się z rozmiarem danych."""

#Zadanie 15:
def harmonic_sum(n):
    if n == 1:
        return 1
    else:
        return 1/n + harmonic_sum(n-1)

#Zadanie_16:
def alternating_harmonic_sum(n):
    if n == 1:
        return 1
    else:
        return (-1)**(n+1) * 1/n + alternating_harmonic_sum(n-1)

#Zadanie_17:
def find_minimum(arr, n):
    if n == 1:
        return arr[0]
    else:
        return min(arr[n-1], find_minimum(arr, n-1))

#Zadanie_18:
def find_minimum_recursive(arr, n):
    if n == 1:
        return arr[0]
    else:
        return min(arr[0], find_minimum_recursive(arr[1:], n-1))


# Zadanie_19:
"""
a) aby przenieść wieżę złożoną z n krązków, potrzeba co najmniej (2^n-1) ruchów
"""
def hanoi(n, source, target, auxiliary):
    if n == 1:
        print(f"({source}, {target})")
        return
    hanoi(n-1, source, auxiliary, target)
    print(f"({source}, {target})")
    hanoi(n-1, auxiliary, target, source)


hanoi(3, 'A', 'B', 'C')
