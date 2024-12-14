class Samochod:
    def __init__(self, marka: str, model: str, rok: int, kolor: str):
        self.marka = marka
        self.model = model
        self.rok = rok
        self.kolor = kolor

    def uruchom_silnik(self):
        return f"Silnik samochodu {self.marka} {self.model} został uruchomiony."

    def zgas_silnik(self):
        return f"Silnik samochodu {self.marka} {self.model} został zgaszony."

    def zatrab(self):
        return f"{self.marka} {self.model} trąbi: Beep beep!"

    def __str__(self):
        return f"{self.rok} {self.kolor} {self.marka} {self.model}"


class ElektrycznySamochod(Samochod):
    def __init__(self, marka, model, rok, kolor, pojemnosc_baterii):
        super().__init__(marka, model, rok, kolor)
        self.pojemnosc_baterii = pojemnosc_baterii

    def ladowanie(self):
        return f"{self.marka} {self.model} jest ładowany."

    def __str__(self):
        return (
                super().__str__() + f" z baterią o pojemności {self.pojemnosc_baterii} kWh"
        )


class SportowySamochod(Samochod):
    def __init__(self, marka, model, rok, kolor, maksymalna_predkosc):
        super().__init__(marka, model, rok, kolor)
        self.maksymalna_predkosc = maksymalna_predkosc

    def tryb_wyscigowy(self):
        return f"{self.marka} {self.model} jest teraz w trybie wyścigowym!"

    def __str__(self):
        return (
                super().__str__()
                + f" z maksymalną prędkością {self.maksymalna_predkosc} km/h"
        )


class SUV(Samochod):
    def __init__(self, marka, model, rok, kolor, zdolnosc_terenowa):
        super().__init__(marka, model, rok, kolor)
        self.zdolnosc_terenowa = zdolnosc_terenowa

    def jazda_w_terenie(self):
        if self.zdolnosc_terenowa:
            return f"{self.marka} {self.model} świetnie radzi sobie w terenie!"
        else:
            return f"{self.marka} {self.model} nie nadaje się do jazdy w terenie."

    def __str__(self):
        zdolnosc = "terenowy" if self.zdolnosc_terenowa else "nieterenowy"
        return super().__str__() + f" i jest {zdolnosc}"


if __name__ == "__main__":
    tesla = ElektrycznySamochod("Tesla", "Model S", 2022, "czerwony", 100)
    porsche = SportowySamochod("Porsche", "911 Turbo", 2023, "niebieski", 330)
    jeep = SUV("Jeep", "Wrangler", 2021, "zielony", True)
    audi = SUV("Audi", "A2", "2007", "szary", False)
    print(tesla)
    print(tesla.ladowanie())
    print(tesla.zatrab())
    print()

    print(porsche)
    print(porsche.uruchom_silnik())
    print(porsche.zatrab())
    print(porsche.tryb_wyscigowy())
    print(porsche.zgas_silnik())

    print()

    print(jeep)
    print(jeep.jazda_w_terenie())
    print()
    print(audi)
    print(audi.jazda_w_terenie())
    print()
    print(Samochod("Mercedes", "G63", 2024, "Czorny"))