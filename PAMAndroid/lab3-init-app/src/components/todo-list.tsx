import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {useState} from 'react';
import { useTasks } from '../../context/TasksContext';
// TODO: Zdefiniuj typ Todo z polami: id (string), text (string), done (boolean)
type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function TodoList() {
  // TODO: Dodaj stan todos — tablica obiektów Todo, domyślnie pusta
    const { todos, addTodo, deleteTodo, toggleTodo, isLoaded } = useTasks();
  // TODO: Dodaj stan input — string przechowujący wartość pola tekstowego
  const [input, setInput] = useState('')
    const handleAdd = () => {
        if (input.trim()) {
          addTodo(input);
          setInput(""); // Czyścimy pole po dodaniu zadania
        }
      };
  if (!isLoaded) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* TODO: Jeśli lista nie jest pusta, wyświetl pasek z licznikiem
              np. "Ukończono: X / Y" — oblicz liczbę zadań z done === true */}
              {todos.length > 0 && (
               <View style={styles.statsBar}>
               <Text style={styles.statsText}>
               Ukończono: {todos.filter(t => t.done).length} / {todos.length}
               </Text>
               </View>
              )}

      <FlatList
        data={todos as Todo[] /* TODO: przekaż tablicę todos */}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyText}>Brak zadań.</Text>
            <Text style={styles.emptyHint}>
              Dodaj pierwsze zadanie poniżej!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {/* TODO: Checkbox (TouchableOpacity) — naciśnięcie wywołuje toggleTodo(item.id)
                    Wypełniony gdy item.done === true */}
               <TouchableOpacity
                style={[styles.checkbox, item.done && styles.checkboxDone]}
                onPress={() => toggleTodo(item.id)}
               >
                {item.done && <Text style={styles.checkmark}>✓</Text>}
               </TouchableOpacity>

            {/* TODO: Tekst zadania (item.text)
                    Styl przekreślenia gdy item.done === true */}
            <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
                        {item.text}
                       </Text>

            {/* TODO: Przycisk "✕" usuwający zadanie — wywołuje deleteTodo(item.id) */}
            <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteTodo(item.id)}
                           >
                            <Text style={styles.deleteButtonText}>✕</Text>
                           </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        {/* TODO: TextInput
                value={input}, onChangeText ustawia stan input
                onSubmitEditing wywołuje addTodo, returnKeyType="done" */}
        <TextInput style={styles.input} value={input} onChangeText={setInput} onSubmitEditing={handleAdd} returnKeyType='done'/>
        {/* TODO: Przycisk "+" wywołujący addTodo
                Wyszarz go gdy input jest pusty */}
        <TouchableOpacity
         style={[styles.addButton, !input.trim() && styles.addButtonDisabled]}
         onPress={handleAdd}
         disabled={!input.trim()}
        >
         <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFFF",
  },
  statsBar: {
    backgroundColor: "#6C63FF",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  statsText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.9,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 10,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  emptyHint: {
    fontSize: 14,
    color: "#aaa",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    gap: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  todoTextDone: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFE5E5",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  deleteButtonText: {
    color: "#E53935",
    fontWeight: "bold",
    fontSize: 13,
  },
  inputRow: {
    flexDirection: "row",
    padding: 16,
    gap: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E8E8FF",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0EFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#C5C2FF",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "300",
  },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
