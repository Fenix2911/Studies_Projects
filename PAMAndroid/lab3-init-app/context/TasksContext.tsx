import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Typ pojedynczego zadania
type Todo = {
  id: string;
  text: string;
  done: boolean;
};

// Typ wartości przekazywanej przez Context
type TasksContextType = {
  todos: Todo[];
  addTodo: (input: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  isLoaded: boolean;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const STORAGE_KEY = 'todos';
    function addTodo (input:string) {
            const trimmedText = input.trim()
            if (!trimmedText) {
                return
                }
            setTodos([...todos, {
                id: Date.now().toString(),
                text: trimmedText,
                done: false}]);
          }
      function toggleTodo(id:string) {
              setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo));
              };
      function deleteTodo(id: string) {
              setTodos(todos.filter(todo => todo.id !== id));
              }
     useEffect(() => {
         const loadTodos = async () => {
           try {
             await new Promise(r => setTimeout(r, 1500));

             const stored = await AsyncStorage.getItem(STORAGE_KEY);
             if (stored !== null) {
               setTodos(JSON.parse(stored));
             }
           } catch (error) {
             console.error('Błąd wczytywania:', error);
           } finally {
             setIsLoaded(true);
           }
         };
         loadTodos();
       }, []);

     useEffect(() => {
       if (!isLoaded) return;

       const saveTodos = async () => {
         try {
           await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
         } catch (error) {
           console.error('Błąd zapisu:', error);
         }
       };
       saveTodos();
     }, [todos, isLoaded]);
  return (
    <TasksContext.Provider
      value={{ todos, addTodo, deleteTodo, toggleTodo, isLoaded }}
      // TODO: zamień null as any na obiekt { tasks, addTask, deleteTask, toggleTask }
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextType {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks musi być użyty wewnątrz TasksProvider");
  }
  return context;
}
