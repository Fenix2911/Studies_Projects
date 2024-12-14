#Zadanie_1
def find_min(arr, left, right):
    if left == right:
        return arr[left]
    mid = (left + right) // 2
    min_left = find_min(arr, left, mid)
    min_right = find_min(arr, mid + 1, right)
    return min(min_left, min_right)

arr = [3, 41, 52, 26, 38, 57, 9, 49, 20, 45]
min_element = find_min(arr, 0, len(arr) - 1)
print("Minimalny element:", min_element)

#Zadanie_2
def find_min_max(arr, left, right):
    if left == right:
        return arr[left], arr[left]
    if right == left + 1:
        return (min(arr[left], arr[right]), max(arr[left], arr[right]))
    mid = (left + right) // 2
    min_left, max_left = find_min_max(arr, left, mid)
    min_right, max_right = find_min_max(arr, mid + 1, right)
    return (min(min_left, min_right), max(max_left, max_right))

arr = [3, 41, 52, 26, 38, 57, 9, 49, 20, 45]
min_element, max_element = find_min_max(arr, 0, len(arr) - 1)
print("Minimalny element:", min_element)
print("Maksymalny element:", max_element)

#Zadanie_10
"""
Kopiec oparty na maksimum (Max-Heap): [71, 66, 24, 32, 27, 23, 8, 5, 22, 25, 18]
Wstawianie 61:

Dodaj 61 na koniec: [71, 66, 24, 32, 27, 23, 8, 5, 22, 25, 18, 61]
Przemieszczanie w górę (61 > 23):
[71, 66, 24, 32, 27, 61, 8, 5, 22, 25, 18, 23]
Przemieszczanie w górę (61 > 24):
[71, 66, 61, 32, 27, 24, 8, 5, 22, 25, 18, 23]
Kopiec po wstawieniu 61: [71, 66, 61, 32, 27, 24, 8, 5, 22, 25, 18, 23]
Wstawianie 10:

Dodaj 10 na koniec: [71, 66, 61, 32, 27, 24, 8, 5, 22, 25, 18, 23, 10]
10 jest mniejsze od rodzica (24), więc pozostaje na miejscu
Kopiec po wstawieniu 10: [71, 66, 61, 32, 27, 24, 8, 5, 22, 25, 18, 23, 10]
Wstawianie 100:

Dodaj 100 na koniec: [71, 66, 61, 32, 27, 24, 8, 5, 22, 25, 18, 23, 10, 100]
Przemieszczanie w górę (100 > 8):
[71, 66, 61, 32, 27, 24, 100, 5, 22, 25, 18, 23, 10, 8]
Przemieszczanie w górę (100 > 61):
[71, 66, 100, 32, 27, 61, 24, 5, 22, 25, 18, 23, 10, 8]
Przemieszczanie w górę (100 > 71):
[100, 66, 71, 32, 27, 61, 24, 5, 22, 25, 18, 23, 10, 8]
Kopiec po wstawieniu 100: [100, 66, 71, 32, 27, 61, 24, 5, 22, 25, 18, 23, 10, 8]"""

#Zadanie_11
"""
Kopiec oparty na maksimum (Max-Heap): [71, 66, 24, 32, 27, 23, 8, 5, 22, 25, 18]
Zilustruj kilkukrotne działanie algorytmu Extract-Max:

Extract-Max (pierwsze):

Usuń korzeń (71), umieść ostatni element (18) na korzeń: [18, 66, 24, 32, 27, 23, 8, 5, 22, 25]
Przemieszczanie w dół (18 < 66):
[66, 18, 24, 32, 27, 23, 8, 5, 22, 25]
Przemieszczanie w dół (18 < 32):
[66, 32, 24, 18, 27, 23, 8, 5, 22, 25]
Kopiec po pierwszym Extract-Max: [66, 32, 24, 18, 27, 23, 8, 5, 22, 25]
Extract-Max (drugie):

Usuń korzeń (66), umieść ostatni element (25) na korzeń: [25, 32, 24, 18, 27, 23, 8, 5, 22]
Przemieszczanie w dół (25 < 32):
[32, 25, 24, 18, 27, 23, 8, 5, 22]
Przemieszczanie w dół (25 < 27):
[32, 27, 24, 18, 25, 23, 8, 5, 22]
Kopiec po drugim Extract-Max: [32, 27, 24, 18, 25, 23, 8, 5, 22]
Extract-Max (trzecie):

Usuń korzeń (32), umieść ostatni element (22) na korzeń: [22, 27, 24, 18, 25, 23, 8, 5]
Przemieszczanie w dół (22 < 27):
[27, 22, 24, 18, 25, 23, 8, 5]
Przemieszczanie w dół (22 < 25):
[27, 25, 24, 18, 22, 23, 8, 5]
Kopiec po trzecim Extract-Max: [27, 25, 24, 18, 22, 23, 8, 5]"""
#Zadanie_12
"""
a) Z tablicy: [15, 3, 5, 2, 6, 1, 9, 8, 10, 4]

Budowanie kopca poprzez insert:
Początkowo: []
Insert 15: [15]
Insert 3: [15, 3]
Insert 5: [15, 3, 5]
Insert 2: [15, 3, 5, 2]
Insert 6: [15, 6, 5, 2, 3]
Insert 1: [15, 6, 5, 2, 3, 1]
Insert 9: [15, 6, 9, 2, 3, 1, 5]
Insert 8: [15, 6, 9, 8, 3, 1, 5, 2]
Insert 10: [15, 10, 9, 8, 6, 1, 5, 2, 3]
Insert 4: [15, 10, 9, 8, 6, 1, 5, 2, 3, 4]

b) Z tablicy: [E, A, S, Y, Q, U, E, S, T, I, O, N]
Początkowo: []
Insert E: [E]
Insert A: [E, A]
Insert S: [S, A, E]
Insert Y: [Y, S, E, A]
Insert Q: [Y, S, E, A, Q]
Insert U: [Y, U, E, A, Q, S]
Insert E: [Y, U, E, A, Q, S, E]
Insert S: [Y, U, S, A, Q, S, E, E]
Insert T: [Y, U, S, T, Q, S, E, E, A]
Insert I: [Y, U, S, T, Q, S, E, E, A, I]
Insert O: [Y, U, S, T, Q, S, E, E, A, I, O]
Insert N: [Y, U, S, T, Q, S, E, E, A, I, O, N]
"""

#Zadanie_13
"""
a) Z tablicy: [15, 3, 5, 2, 6, 1, 9, 8, 10, 4]

Budowanie kopca poprzez insert:
Początkowo: []
Insert 15: [15]
Insert 3: [3, 15]
Insert 5: [3, 15, 5]
Insert 2: [2, 3, 5, 15]
Insert 6: [2, 3, 5, 15, 6]
Insert 1: [1, 2, 5, 15, 6, 3]
Insert 9: [1, 2, 5, 15, 6, 3, 9]
Insert 8: [1, 2, 5, 8, 6, 3, 9, 15]
Insert 10: [1, 2, 5, 8, 6, 3, 9, 15, 10]
Insert 4: [1, 2, 5, 8, 4, 3, 9, 15, 10, 6]

b) Z tablicy: [E, A, S, Y, Q, U, E, S, T, I, O, N]

Budowanie kopca poprzez insert:
Początkowo: []
Insert E: [E]
Insert A: [A, E]
Insert S: [A, E, S]
Insert Y: [A, E, S, Y]
Insert Q: [A, E, S, Y, Q]
Insert U: [A, E, S, Y, Q, U]
Insert E: [A, E, E, Y, Q, U, S]
Insert S: [A, E, E, S, Q, U, S, Y]
Insert T: [A, E, E, S, Q, U, S, Y, T]
Insert I: [A, E, E, I, Q, U, S, Y, T, S]
Insert O: [A, E, E, I, O, U, S, Y, T, S, Q]
Insert N: [A, E, E, I, N, U, S, Y, T, S, Q, O]

"""
#Zadanie_14
"""
a) SEN
b) NEPAL
C) LADA
d) DL?"""

#Zadanie_16
"""
A: 5
B: 4
C: 7
D: 2
E: 6
F: 7
G: 3
H: 1

Używamy kolejki priorytetowej, aby iteracyjnie łączyć dwa węzły o najmniejszych częstotliwościach.

Połącz H (1) i D (2) -> HD: 3
Połącz G (3) i HD (3) -> GHD: 6
Połącz B (4) i A (5) -> BA: 9
Połącz E (6) i GHD (6) -> EGHD: 12
Połącz C (7) i F (7) -> CF: 14
Połącz BA (9) i EGHD (12) -> BAEGHD: 21
Połącz BAEGHD (21) i CF (14) -> BAEGHDCF: 35

                    35
                  /    \
                21      14
              /   \    /   \
            9      12  7    7
           / \    / \  C    F
          B   A  E  GHD
                   / \
                  G   HD
                     /  \
                    H    D

A:  010
B:  011
C:  100
D:  1111
E:  110
F:  101
G:  1110
H:  11100

a) Średnia długość kodu = (5 * 3 + 4 * 3 + 7 * 3 + 2 * 4 + 6 * 3 + 7 * 3 + 3 * 4 + 1 * 5) / 35
                     = (15 + 12 + 21 + 8 + 18 + 21 + 12 + 5) / 35
                     = 112 / 35
                     ≈ 3.2

b) Całkowita liczba bitów = 5*3 + 4*3 + 7*3 + 2*4 + 6*3 + 7*3 + 3*4 + 1*5
                      = 15 + 12 + 21 + 8 + 18 + 21 + 12 + 5
                      = 112 bitów



"""

