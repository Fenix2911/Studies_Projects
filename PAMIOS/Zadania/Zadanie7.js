const serviceTickets = [
	{ ticketId: 101, customer: "Marta", hardware: "smartfon", state: "nowe" },
	{ ticketId: 102, customer: "Kamil", hardware: "konsola", state: "w trakcie" },
	{ ticketId: 103, customer: "Zofia", hardware: "laptop", state: "w trakcie" }
];

const targetId = 101;
const foundTicket = serviceTickets.find(ticket => ticket.ticketId === targetId);

const updatedTickets = serviceTickets.map(ticket => {
	if (ticket.ticketId === targetId) {
		return { ...ticket, state: "w trakcie", lastUpdated: new Date().toLocaleDateString() }; // Rozszerzenie
	}
	return ticket;
});

const inProgressCount = updatedTickets.filter(ticket => ticket.state === "w trakcie").length;

console.log("Oryginalna tablica:", serviceTickets);
console.log("Zaktualizowana tablica:", updatedTickets);
console.log(`Liczba zgłoszeń 'w trakcie': ${inProgressCount}`);

/*
KOMENTARZ DO ZADANIA:
- Co działa: find() do znalezienia elementu, niemutowalne map() ze spread (...) do edycji stanu.
- Rozszerzenie własne: Dodano znacznik czasu (`lastUpdated`) do modyfikowanego obiektu.
- Trudność: Zrozumienie, że obiekty w tablicy modyfikujemy zwracając nowy obiekt, a nie zmieniając jego właściwość bezpośrednio.
*/