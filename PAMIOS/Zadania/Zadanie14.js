let taskList = [
	{ taskId: 1, title: "Nauczyć się Reacta", isDone: false },
	{ taskId: 2, title: "Zrobić zakupy", isDone: true },
	{ taskId: 3, title: "Odpisać na maile", isDone: false }
];

const addTask = (tasks, title) => [
	...tasks,
	{ taskId: tasks.length ? Math.max(...tasks.map(t => t.taskId)) + 1 : 1, title, isDone: false }
];

const toggleDone = (tasks, id) => tasks.map(task =>
	task.taskId === id ? { ...task, isDone: !task.isDone } : task
);

const getPendingTasks = (tasks) => tasks.filter(task => !task.isDone);

// Rozszerzenie: Funkcja usuwająca (niemutowalnie)
const removeTask = (tasks, id) => tasks.filter(task => task.taskId !== id);

taskList = addTask(taskList, "Pójść na spacer");
taskList = toggleDone(taskList, 1); // Zaznaczamy jedynkę jako zrobioną
let pending = getPendingTasks(taskList);
taskList = removeTask(taskList, 2); // Rozszerzenie - usuwamy zakupy

console.log("Do zrobienia:", pending);
console.log("Aktualny pełny stan listy:", taskList);

/*
KOMENTARZ DO ZADANIA:
- Co działa: W pełni funkcjonalne, w 100% niemutowalne operacje CRUD (Create, Update, Delete) z użyciem spread operatora i ternary.
- Rozszerzenie własne: Funkcja `removeTask` usuwająca element za pomocą funkcji filter (bezpieczna niemutacja).
- Trudność: Dynamiczne wyznaczanie nowego ID podczas dodawania zadania (Math.max).
*/