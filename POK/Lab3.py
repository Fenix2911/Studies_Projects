import numpy as np
import scipy.linalg as scipy


# Zadanie 1
def polyarea(x, y):
    n = len(x)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += x[i] * y[j] - x[j] * y[i]
    return abs(area) / 2.0


x_tri, y_tri = [0, 2, 1], [0, 0, 2]
print(f"Pole trójkąta: {polyarea(x_tri, y_tri)}")

x_quad, y_quad = [0, 2, 2, 0], [0, 0, 2, 2]
print(f"Pole czworoboku: {polyarea(x_quad, y_quad)}")

x_pent, y_pent = [0, 2, 2, 1, 0], [0, 0, 1, 2, 1]
print(f"Pole pięciokąta: {polyarea(x_pent, y_pent)}")

# Zadanie 2
A1 = np.array([[1, 2, 3], [2, 3, 4], [3, 4, 5]])

A2 = np.array([[2.11, -0.80, 1.72], [-1.84, 3.03, 1.29], [-1.57, 5.25, 4.30]])

A3 = np.array([[2, -1, 0], [-1, 2, -1], [0, -1, 2]])

A4 = np.array([[4, 3, -1], [7, -2, 3], [5, -18, 13]])

matrices = [A1, A2, A3, A4]

for i, A in enumerate(matrices, 1):
    det = np.linalg.det(A)
    cond = np.linalg.cond(A)

    print(f"\nMacierz {i}: Det = {det:.4f}, Cond = {cond:.4f}")

    # Klasyfikacja na podstawie wyznacznika i uwarunkowania
    if np.isclose(det, 0):
        print(" -> Klasyfikacja: Singularna (osobliwa)")
    elif cond > 1000:
        print(" -> Klasyfikacja: Źle uwarunkowana (ill-conditioned)")
    else:
        print(" -> Klasyfikacja: Dobrze uwarunkowana (well-conditioned)")

# Zadanie 3
L1 = np.array([[1, 0, 0], [1, 1, 0], [1, 5 / 3, 1]])
U1 = np.array([[1, 2, 4], [0, 3, 21], [0, 0, 0]])
# Mnożenie macierzy przy użyciu operatora @
A1_lu = L1 @ U1
# Wyznacznik iloczynu to również iloczyn wyznaczników (lub z przekątnych dla macierzy trójkątnych)
det_A1 = np.linalg.det(A1_lu)

print("Zadanie 3.1 - Macierz A:")
print(A1_lu)
print(f"Wyznacznik |A|: {np.round(det_A1)}")

L2 = np.array([[2, 0, 0], [-1, 1, 0], [1, -3, 1]])
U2 = np.array([[2, -1, 1], [0, 1, -3], [0, 0, 1]])

A2_lu = L2 @ U2
det_A2 = np.linalg.det(A2_lu)

print("\nZadanie 3.2 - Macierz A:")
print(A2_lu)
print(f"Wyznacznik |A|: {np.round(det_A2)}")

# Zadanie 4
L = np.array([[1, 0, 0], [3 / 2, 1, 0], [1 / 2, 11 / 13, 1]])

U = np.array([[2, -3, -1], [0, 13 / 2, -7 / 2], [0, 0, 32 / 13]])

b = np.array([1, -1, 2])

# Krok 1: Rozwiązanie układu L * y = b (podstawianie w przód)
# Parametr lower=True oznacza, że macierz jest dolnotrójkątna
y = scipy.solve_triangular(L, b, lower=True)
print("Krok 1 - Wektor pośredni y:", y)

# Krok 2: Rozwiązanie układu U * x = y (podstawianie wstecz)
# Parametr lower=False oznacza, że macierz jest górnotrójkątna
x = scipy.solve_triangular(U, y, lower=False)
print("Krok 2 - Rozwiązanie wektora x:", x)
