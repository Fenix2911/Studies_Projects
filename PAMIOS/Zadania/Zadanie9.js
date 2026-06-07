const shoppingCart = [
	{ item: "Kawa", unitPrice: 25.0, qty: 2 },
	{ item: "Mleko", unitPrice: 3.5, qty: 3 },
	{ item: "Cukier", unitPrice: 4.0, qty: 1 }
];

const discountTrigger = 50;
const discountRate = 15; // 15% zniżki

const cartDescriptions = shoppingCart.map(p => `${p.qty} × ${p.item} (${p.unitPrice * p.qty} PLN)`);
const totalBeforeDiscount = shoppingCart.reduce((sum, p) => sum + (p.unitPrice * p.qty), 0);

let finalTotal = totalBeforeDiscount;
let savedAmount = 0; // Rozszerzenie

if (totalBeforeDiscount > discountTrigger) {
	savedAmount = totalBeforeDiscount * (discountRate / 100);
	finalTotal = totalBeforeDiscount - savedAmount;
}

console.log("Twoje produkty:\n" + cartDescriptions.join("\n"));
console.log(`Suma początkowa: ${totalBeforeDiscount.toFixed(2)} PLN`);
console.log(`Oszczędzasz: ${savedAmount.toFixed(2)} PLN`);
console.log(`Do zapłaty (po rabacie): ${finalTotal.toFixed(2)} PLN`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: Mnożenie wewnątrz map() i reduce() dla wartości cząstkowych i całkowitych.
- Rozszerzenie własne: Kalkulacja i logowanie dokładnej zaoszczędzonej kwoty (`savedAmount`).
- Trudność: Pilnowanie mnożenia ceny przez ilość w każdej iteracji reduce.
*/