import random
import math
import matplotlib.pyplot as plt


# Zadanie 1
def interpolate(y_array, delta_t, t):
    i = int(t / delta_t)

    if i < 0:
        return y_array[0]
    if i >= len(y_array) - 1:
        return y_array[-1]

    t_i = i * delta_t
    t_next = (i + 1) * delta_t
    y_i = y_array[i]
    y_next = y_array[i + 1]
    y = y_i + ((y_next - y_i) / (t_next - t_i)) * (t - t_i)

    return y


def find_y(y_array, delta_t):
    N = (len(y_array) - 1) * delta_t
    print(f"Tryb wyszukiwania (maksymalny czas N = {N})")

    while True:
        try:
            t = float(
                input(f"Podaj czas w przedziale [0, {N}] (wartość ujemna kończy): ")
            )
        except ValueError:
            print("To nie jest prawidłowa liczba.")
            continue

        if t < 0:
            print("Koniec działania programu.")
            break

        if 0 <= t <= N:
            result = interpolate(y_array, delta_t, t)
            print(f"Interpolowana wartość y dla t = {t} to: {result:.4f}")
        else:
            print("Podany czas jest poza zakresem pomiarów!")


# Zadanie 2
def f(x):
    return 4 * x + 1


a = 4
c = 2
f_c = f(c)

success = True
print("Testowanie wymogu dla 100 losowych punktów z przedziału [0, 10]...")

for i in range(1, 101):
    x_i = random.uniform(0, 10)
    if x_i == c:
        continue

    left_side = (f(x_i) - f_c) / (x_i - c)

    # 1e-9 pozwala uniknąć błędu niedokładności komputerowej liczb numerycznych
    if abs(left_side - a) > 1e-9:
        print(f"Błąd w iteracji {i} dla x={x_i}. Otrzymano {left_side}, oczekiwano {a}")
        success = False

if success:
    print(
        "Zakończono pomyślnie. Dla wszystkich 100 punktów wymóg został spełniony, nachylenie wynosi 4."
    )


# Zadanie 3
def compare_pi_schemes():
    try:
        n = int(input("Podaj liczbę iteracji N dla schematów (np. 100): "))
        if n <= 0:
            print("N musi być większe od 0.")
            return
    except ValueError:
        print("Błędna wartość N.")
        return

    true_pi = math.pi

    errors_leibniz = []
    errors_euler = []

    sum_leibniz = 0
    sum_euler = 0

    for k in range(n):
        # Leibniz
        sum_leibniz += 1 / ((4 * k + 1) * (4 * k + 3))
        pi_leibniz = 8 * sum_leibniz
        errors_leibniz.append(abs(true_pi - pi_leibniz))

    for k in range(1, n + 1):
        # Euler
        sum_euler += 1 / (k**2)
        pi_euler = math.sqrt(6 * sum_euler)
        errors_euler.append(abs(true_pi - pi_euler))

    print(f"\n Wyniki dla N = {n}")
    print(f"Błąd końcowy (Schemat Leibniza): {errors_leibniz[-1]}")
    print(f"Błąd końcowy (Schemat Eulera):   {errors_euler[-1]}")

    plt.figure(figsize=(10, 6))

    iterations = list(range(1, n + 1))

    plt.plot(iterations, errors_leibniz, label="Błąd: Schemat Leibniza (zmodyfikowany)")
    plt.plot(iterations, errors_euler, label="Błąd: Schemat Eulera", color="red")

    plt.title(r"Rozwój błędu przybliżenia $\pi$ w zależności od liczby iteracji $N$")
    plt.xlabel("Liczba iteracji (N)")
    plt.ylabel(r"Błąd bezwzględny ($|\pi - \pi_{approx}|$ )")

    plt.yscale("log")
    plt.grid(True, which="both", ls="--")
    plt.legend()
    plt.show()


if __name__ == "__main__":
    parameters_y = [4.4, 2.0, 11.0, 21.5, 7.5]
    delta_t = 1.0

    print("Odpowiedzi do podpunktu C")
    t1, t2 = 2.5, 3.1
    print(f"Dla t = {t1} min, y = {interpolate(parameters_y, delta_t, t1):.4f}")
    print(f"Dla t = {t2} min, y = {interpolate(parameters_y, delta_t, t2):.4f}\n")
    find_y(parameters_y, delta_t)
    compare_pi_schemes()
