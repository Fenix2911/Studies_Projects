import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import TodoList from "../components/todo-list";

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lista zadań" }} />
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFFF",
  },
});
