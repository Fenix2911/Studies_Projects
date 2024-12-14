import random
gracze = ["Kuc", "Seba", "Werka", "Dawid", "Kosiarek", "Michał", "Duolingo", "Eryk"]
noweTeamy= []
random.shuffle(gracze)
team = 0

for i, gracz in enumerate(gracze):
    if i % 2 == 0:
        noweTeamy.append([])
        team += 1

    noweTeamy[team - 1].append(gracz)

# Wyświetl wyniki
for i, team in enumerate(noweTeamy, start=1):
    print(f"Team {i}: {team}")
