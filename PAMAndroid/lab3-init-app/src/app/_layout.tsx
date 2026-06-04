import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import BottomTabBar from "../components/bottom-tab-bar";
import { TasksProvider } from '../../context/TasksContext';


export default function RootLayout() {
  return (
    <View style={styles.container}>

      <TasksProvider>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      </TasksProvider>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
