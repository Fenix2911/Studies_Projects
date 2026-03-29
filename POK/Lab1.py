import math
import numpy as np
import matplotlib.pyplot as plt
#Zadanie 1
def objetnosc(L):
    return L**3
L = 4
V = objetnosc(L)
print("Zadanie 1:")
print(V, "cm^3")

#Zadanie 2
def obwod(r):
    return 2*math.pi*r
def pole(r):
    return math.pi*r**2
r = 2
C = obwod(r)
A = pole(r)
print("Zadanie 2:")
print(C, "cm")
print(A, "cm^2")

#Zadanie 3
print("Zadanie 3:")
def list_of_l():
    return [np.linspace(1,3,3)]

def list_of_v(array):
    return [i**3 for i in array]
L = np.linspace(1,3,100)
V = L**3
plt.plot(L, V)
L_array = list_of_l()
print("L elements:",L_array)
V_array=list_of_v(L_array)
print("V elements:",V_array)
L_points = np.linspace(1,3,3)
V_points = [i**3 for i in L_points]
plt.scatter(L_points, V_points)
plt.xlabel('Wartość L')
plt.ylabel('Wartość V')
plt.title('Wykres V wersus L')
plt.show()

#Zadanie 4
def count_avg(count):
    return count/5
suma = 0
for _ in range(0,5):
    suma = suma + int(input())
avg = count_avg(suma)
print("Zadanie 4:")
print("Suma:",avg)

#Zadanie 5
family1 = np.zeros(4)
family2 = np.zeros(4)
numbers = np.zeros(4)

family1[0] = 1.60
family1[1] = 1.85
family1[2] = 1.75
family1[3] = 1.80

family2[0] = 0.50
family2[1] = 0.70
family2[2] = 1.90
family2[3] = 1.75

numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4

plt.figure(figsize=(8, 5))
plt.plot(numbers, family1, 'r-', label='Rodzina 1')
plt.plot(numbers, family2, 'b-', label='Rodzina 2')
plt.axis([0, 5, 0, 2])
plt.xlabel('Numer członka rodziny')
plt.ylabel('Wzrost (m)')
plt.title('Porównanie wzrostu członków dwóch rodzin')
plt.legend()
plt.grid(True)

plt.show()

