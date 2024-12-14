from abc import ABC, abstractmethod

# Klasa abstrakcyjna Operation, która definiuje metodę abstrakcyjną calculate
class Operation(ABC):
    @abstractmethod
    def calculate(self, a, b):
        pass

# Klasa Addition dziedzicząca po Operation, implementująca metodę calculate
class Addition(Operation):
    def calculate(self, a, b):
        return a + b

# Klasa Subtraction dziedzicząca po Operation, implementująca metodę calculate
class Subtraction(Operation):
    def calculate(self, a, b):
        return a - b

# Klasa Multiplication dziedzicząca po Operation, implementująca metodę calculate
class Multiplication(Operation):
    def calculate(self, a, b):
        return a * b

# Klasa Division dziedzicząca po Operation, implementująca metodę calculate
class Division(Operation):
    def calculate(self, a, b):
        if b == 0:
            raise ValueError("Dzielenie przez zero jest niedozwolone.")
        return a / b

# Klasa Modulo dziedzicząca po Operation, implementująca metodę calculate
class Modulo(Operation):
    def calculate(self, a, b):
        return a % b

# Klasa Calculator, która zarządza operacjami matematycznymi
class Calculator:
    def __init__(self):
        # Słownik przechowujący dostępne operacje
        self.__operations = {
            '+': Addition(),
            '-': Subtraction(),
            '*': Multiplication(),
            '/': Division(),
            '%': Modulo()
        }

    # Metoda prywatna do walidacji wejściowych danych
    def __validate_input(self, input_str):
        try:
            return float(input_str)
        except ValueError:
            raise ValueError("Podano nieprawidłową wartość. Użyj liczb.")

    # Metoda do wykonywania obliczeń na podstawie operatora
    def calculate(self, a, b, operator):
        if operator not in self.__operations:
            raise ValueError(f"Nieznany operator: {operator}")
        return self.__operations[operator].calculate(a, b)

    # Metoda do dodawania nowych operacji
    def add_operation(self, operator, operation):
        if not isinstance(operation, Operation):
            raise TypeError("Dodana operacja musi dziedziczyć po klasie Operation.")
        self.__operations[operator] = operation

# Główna część programu
if __name__ == "__main__":
    calc = Calculator()
    while True:
        try:
            print("\nKalkulator konsolowy")
            a = input("Podaj pierwszą liczbę: ")
            a = calc._Calculator__validate_input(a)

            b = input("Podaj drugą liczbę: ")
            b = calc._Calculator__validate_input(b)

            operator = input("Podaj operator (+, -, *, /, %): ")
            wynik = calc.calculate(a, b, operator)
            print(f"Wynik: {wynik}")

        except ValueError as e:
            print(f"Błąd: {e}")

        except Exception as e:
            print(f"Nieoczekiwany błąd: {e}")

        finally:
            cont = input("Czy chcesz kontynuować? (tak/nie): ").strip().lower()
            if cont != 'tak':
                print("Koniec działania kalkulatora.")
                break